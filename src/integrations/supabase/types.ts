export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          table_name: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cfr_parcels: {
        Row: {
          area_hectares: number
          boundaries: string | null
          created_at: string | null
          district: string
          geom: unknown | null
          holder_id: string | null
          id: string
          issue_date: string | null
          latitude: number | null
          longitude: number | null
          parcel_number: string
          patta_number: string | null
          state: Database["public"]["Enums"]["state_type"]
          status: string | null
          updated_at: string | null
          village: string
        }
        Insert: {
          area_hectares: number
          boundaries?: string | null
          created_at?: string | null
          district: string
          geom?: unknown | null
          holder_id?: string | null
          id?: string
          issue_date?: string | null
          latitude?: number | null
          longitude?: number | null
          parcel_number: string
          patta_number?: string | null
          state: Database["public"]["Enums"]["state_type"]
          status?: string | null
          updated_at?: string | null
          village: string
        }
        Update: {
          area_hectares?: number
          boundaries?: string | null
          created_at?: string | null
          district?: string
          geom?: unknown | null
          holder_id?: string | null
          id?: string
          issue_date?: string | null
          latitude?: number | null
          longitude?: number | null
          parcel_number?: string
          patta_number?: string | null
          state?: Database["public"]["Enums"]["state_type"]
          status?: string | null
          updated_at?: string | null
          village?: string
        }
        Relationships: []
      }
      chat_history: {
        Row: {
          created_at: string | null
          id: string
          language: string | null
          message: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          language?: string | null
          message: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string | null
          message?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          confidence_score: number | null
          document_type: string
          extracted_data: Json | null
          file_url: string
          holder_id: string
          id: string
          parcel_id: string | null
          uploaded_at: string | null
        }
        Insert: {
          confidence_score?: number | null
          document_type: string
          extracted_data?: Json | null
          file_url: string
          holder_id: string
          id?: string
          parcel_id?: string | null
          uploaded_at?: string | null
        }
        Update: {
          confidence_score?: number | null
          document_type?: string
          extracted_data?: Json | null
          file_url?: string
          holder_id?: string
          id?: string
          parcel_id?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_parcel_id_fkey"
            columns: ["parcel_id"]
            isOneToOne: false
            referencedRelation: "cfr_parcels"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          created_at: string | null
          description: string
          district: string | null
          gps_lat: number
          gps_lng: number
          holder_id: string
          id: string
          issue_type: string
          language: string | null
          officer_notes: string | null
          parcel_id: string | null
          state: Database["public"]["Enums"]["state_type"]
          status: string | null
          updated_at: string | null
          village: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          district?: string | null
          gps_lat: number
          gps_lng: number
          holder_id: string
          id?: string
          issue_type: string
          language?: string | null
          officer_notes?: string | null
          parcel_id?: string | null
          state: Database["public"]["Enums"]["state_type"]
          status?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          district?: string | null
          gps_lat?: number
          gps_lng?: number
          holder_id?: string
          id?: string
          issue_type?: string
          language?: string | null
          officer_notes?: string | null
          parcel_id?: string | null
          state?: Database["public"]["Enums"]["state_type"]
          status?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_parcel_id_fkey"
            columns: ["parcel_id"]
            isOneToOne: false
            referencedRelation: "cfr_parcels"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_images: {
        Row: {
          feedback_id: string
          id: string
          image_url: string
          uploaded_at: string | null
        }
        Insert: {
          feedback_id: string
          id?: string
          image_url: string
          uploaded_at?: string | null
        }
        Update: {
          feedback_id?: string
          id?: string
          image_url?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_images_feedback_id_fkey"
            columns: ["feedback_id"]
            isOneToOne: false
            referencedRelation: "feedback"
            referencedColumns: ["id"]
          },
        ]
      }
      iot_sensors: {
        Row: {
          created_at: string | null
          district: string | null
          id: string
          last_reading_at: string | null
          latitude: number
          longitude: number
          parcel_id: string | null
          sensor_id: string
          sensor_type: string
          state: Database["public"]["Enums"]["state_type"]
          status: string | null
          village: string | null
        }
        Insert: {
          created_at?: string | null
          district?: string | null
          id?: string
          last_reading_at?: string | null
          latitude: number
          longitude: number
          parcel_id?: string | null
          sensor_id: string
          sensor_type: string
          state: Database["public"]["Enums"]["state_type"]
          status?: string | null
          village?: string | null
        }
        Update: {
          created_at?: string | null
          district?: string | null
          id?: string
          last_reading_at?: string | null
          latitude?: number
          longitude?: number
          parcel_id?: string | null
          sensor_id?: string
          sensor_type?: string
          state?: Database["public"]["Enums"]["state_type"]
          status?: string | null
          village?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "iot_sensors_parcel_id_fkey"
            columns: ["parcel_id"]
            isOneToOne: false
            referencedRelation: "cfr_parcels"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          district: string | null
          full_name: string
          id: string
          patta_number: string | null
          phone: string | null
          preferred_language: string | null
          state: Database["public"]["Enums"]["state_type"] | null
          updated_at: string | null
          village: string | null
        }
        Insert: {
          created_at?: string | null
          district?: string | null
          full_name: string
          id: string
          patta_number?: string | null
          phone?: string | null
          preferred_language?: string | null
          state?: Database["public"]["Enums"]["state_type"] | null
          updated_at?: string | null
          village?: string | null
        }
        Update: {
          created_at?: string | null
          district?: string | null
          full_name?: string
          id?: string
          patta_number?: string | null
          phone?: string | null
          preferred_language?: string | null
          state?: Database["public"]["Enums"]["state_type"] | null
          updated_at?: string | null
          village?: string | null
        }
        Relationships: []
      }
      sensor_readings: {
        Row: {
          created_at: string | null
          id: string
          reading_type: string
          recorded_at: string | null
          sensor_id: string
          unit: string
          value: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          reading_type: string
          recorded_at?: string | null
          sensor_id: string
          unit: string
          value: number
        }
        Update: {
          created_at?: string | null
          id?: string
          reading_type?: string
          recorded_at?: string | null
          sensor_id?: string
          unit?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "sensor_readings_sensor_id_fkey"
            columns: ["sensor_id"]
            isOneToOne: false
            referencedRelation: "iot_sensors"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          district: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          state: Database["public"]["Enums"]["state_type"] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          district?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          state?: Database["public"]["Enums"]["state_type"] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          district?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          state?: Database["public"]["Enums"]["state_type"] | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "forest_officer" | "patta_holder"
      state_type: "MP" | "Odisha" | "Tripura" | "Telangana"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "forest_officer", "patta_holder"],
      state_type: ["MP", "Odisha", "Tripura", "Telangana"],
    },
  },
} as const
