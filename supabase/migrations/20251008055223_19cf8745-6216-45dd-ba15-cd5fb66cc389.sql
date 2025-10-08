-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create role enum
CREATE TYPE app_role AS ENUM ('admin', 'forest_officer', 'patta_holder');

-- Create state enum
CREATE TYPE state_type AS ENUM ('MP', 'Odisha', 'Tripura', 'Telangana');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  preferred_language TEXT DEFAULT 'en',
  village TEXT,
  district TEXT,
  state state_type,
  patta_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  state state_type,
  district TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create CFR parcels table
CREATE TABLE public.cfr_parcels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parcel_number TEXT UNIQUE NOT NULL,
  patta_number TEXT,
  holder_id UUID REFERENCES auth.users(id),
  state state_type NOT NULL,
  district TEXT NOT NULL,
  village TEXT NOT NULL,
  area_hectares DECIMAL(10, 2) NOT NULL,
  issue_date DATE,
  boundaries TEXT,
  geom GEOMETRY(Polygon, 4326),
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create feedback submissions table
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  holder_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  parcel_id UUID REFERENCES public.cfr_parcels(id),
  issue_type TEXT NOT NULL CHECK (issue_type IN ('boundary_dispute', 'encroachment', 'logging', 'wildlife', 'other')),
  description TEXT NOT NULL CHECK (LENGTH(description) >= 20),
  state state_type NOT NULL,
  district TEXT,
  village TEXT,
  gps_lat DECIMAL(10, 7) NOT NULL,
  gps_lng DECIMAL(10, 7) NOT NULL,
  language TEXT DEFAULT 'en',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'rejected')),
  officer_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create feedback images table
CREATE TABLE public.feedback_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id UUID REFERENCES public.feedback(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create IoT sensors table
CREATE TABLE public.iot_sensors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sensor_id TEXT UNIQUE NOT NULL,
  sensor_type TEXT NOT NULL CHECK (sensor_type IN ('soil', 'water', 'air', 'weather')),
  parcel_id UUID REFERENCES public.cfr_parcels(id),
  state state_type NOT NULL,
  district TEXT,
  village TEXT,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  last_reading_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create IoT sensor readings table
CREATE TABLE public.sensor_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sensor_id UUID REFERENCES public.iot_sensors(id) ON DELETE CASCADE NOT NULL,
  reading_type TEXT NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for time-series queries
CREATE INDEX idx_sensor_readings_time ON public.sensor_readings(sensor_id, recorded_at DESC);

-- Create documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  holder_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  parcel_id UUID REFERENCES public.cfr_parcels(id),
  document_type TEXT NOT NULL CHECK (document_type IN ('patta', 'survey', 'certificate', 'other')),
  file_url TEXT NOT NULL,
  extracted_data JSONB,
  confidence_score DECIMAL(3, 2),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chat history table
CREATE TABLE public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit log table
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cfr_parcels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iot_sensors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sensor_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for cfr_parcels
CREATE POLICY "Holders can view own parcels"
  ON public.cfr_parcels FOR SELECT
  USING (auth.uid() = holder_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'forest_officer'));

CREATE POLICY "Admins can manage parcels"
  ON public.cfr_parcels FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for feedback
CREATE POLICY "Users can view own feedback"
  ON public.feedback FOR SELECT
  USING (auth.uid() = holder_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'forest_officer'));

CREATE POLICY "Users can create feedback"
  ON public.feedback FOR INSERT
  WITH CHECK (auth.uid() = holder_id);

CREATE POLICY "Officers can update feedback"
  ON public.feedback FOR UPDATE
  USING (public.has_role(auth.uid(), 'forest_officer') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for feedback_images
CREATE POLICY "Users can view feedback images"
  ON public.feedback_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.feedback
      WHERE feedback.id = feedback_images.feedback_id
      AND (feedback.holder_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'forest_officer'))
    )
  );

CREATE POLICY "Users can insert feedback images"
  ON public.feedback_images FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.feedback
      WHERE feedback.id = feedback_images.feedback_id
      AND feedback.holder_id = auth.uid()
    )
  );

-- RLS Policies for IoT sensors and readings
CREATE POLICY "Officers and admins can view sensors"
  ON public.iot_sensors FOR SELECT
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'forest_officer'));

CREATE POLICY "Holders can view own parcel sensors"
  ON public.iot_sensors FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.cfr_parcels
      WHERE cfr_parcels.id = iot_sensors.parcel_id
      AND cfr_parcels.holder_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view sensor readings"
  ON public.sensor_readings FOR SELECT
  USING (true);

-- RLS Policies for documents
CREATE POLICY "Users can view own documents"
  ON public.documents FOR SELECT
  USING (auth.uid() = holder_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'forest_officer'));

CREATE POLICY "Users can upload documents"
  ON public.documents FOR INSERT
  WITH CHECK (auth.uid() = holder_id);

-- RLS Policies for chat_history
CREATE POLICY "Users can view own chat history"
  ON public.chat_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create chat messages"
  ON public.chat_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for audit_logs
CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cfr_parcels_updated_at
  BEFORE UPDATE ON public.cfr_parcels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_feedback_updated_at
  BEFORE UPDATE ON public.feedback
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, preferred_language)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'preferred_language', 'en')
  );
  
  -- Assign default role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'patta_holder');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage buckets for feedback images and documents
INSERT INTO storage.buckets (id, name, public) VALUES ('feedback-images', 'feedback-images', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Storage policies for feedback images
CREATE POLICY "Users can upload feedback images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'feedback-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own feedback images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'feedback-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Officers can view all feedback images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'feedback-images' AND (public.has_role(auth.uid(), 'forest_officer') OR public.has_role(auth.uid(), 'admin')));

-- Storage policies for documents
CREATE POLICY "Users can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Officers can view all documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents' AND (public.has_role(auth.uid(), 'forest_officer') OR public.has_role(auth.uid(), 'admin')));