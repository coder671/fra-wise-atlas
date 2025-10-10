-- Fix sensor_readings public access vulnerability
-- Drop the overly permissive policy that allows anyone to view sensor data
DROP POLICY IF EXISTS "Anyone can view sensor readings" ON public.sensor_readings;

-- Create restrictive policy for sensor_readings
-- Only authenticated users with proper roles can view sensor data
CREATE POLICY "Authenticated users can view sensor readings"
ON public.sensor_readings
FOR SELECT
TO authenticated
USING (
  -- Allow if user is admin or forest officer
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'forest_officer'::app_role) OR
  -- Allow if user is holder of the parcel the sensor belongs to
  EXISTS (
    SELECT 1 FROM public.iot_sensors s
    JOIN public.cfr_parcels p ON s.parcel_id = p.id
    WHERE s.id = sensor_readings.sensor_id
    AND p.holder_id = auth.uid()
  )
);