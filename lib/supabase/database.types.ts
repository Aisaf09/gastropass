/**
 * Hand-written to mirror supabase/schema.sql. Once a real Supabase project
 * exists, prefer regenerating with:
 *   supabase gen types typescript --project-id <ref> > lib/supabase/database.types.ts
 */
export type PassPlatform = "apple" | "google";
export type PassStatus = "active" | "expired" | "revoked";

export type Database = {
  public: {
    Views: Record<string, never>;
    Functions: Record<string, never>;
    CompositeTypes: Record<string, never>;
    Tables: {
      restaurants: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          slug: string;
          is_public: boolean;
          logo_url: string | null;
          brand_color: string;
          points_per_visit: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          slug: string;
          is_public?: boolean;
          logo_url?: string | null;
          brand_color?: string;
          points_per_visit?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          slug?: string;
          is_public?: boolean;
          logo_url?: string | null;
          brand_color?: string;
          points_per_visit?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          id: string;
          restaurant_id: string;
          full_name: string;
          email: string | null;
          phone: string | null;
          points_balance: number;
          marketing_consent: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          full_name: string;
          email?: string | null;
          phone?: string | null;
          points_balance?: number;
          marketing_consent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          restaurant_id?: string;
          full_name?: string;
          email?: string | null;
          phone?: string | null;
          points_balance?: number;
          marketing_consent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      passes: {
        Row: {
          id: string;
          customer_id: string;
          restaurant_id: string;
          platform: PassPlatform;
          serial_number: string;
          status: PassStatus;
          apple_auth_token: string | null;
          apple_push_token: string | null;
          apple_device_library_identifiers: string[];
          google_object_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          restaurant_id: string;
          platform: PassPlatform;
          serial_number: string;
          status?: PassStatus;
          apple_auth_token?: string | null;
          apple_push_token?: string | null;
          apple_device_library_identifiers?: string[];
          google_object_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          restaurant_id?: string;
          platform?: PassPlatform;
          serial_number?: string;
          status?: PassStatus;
          apple_auth_token?: string | null;
          apple_push_token?: string | null;
          apple_device_library_identifiers?: string[];
          google_object_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          restaurant_id: string;
          created_by: string | null;
          title: string;
          message: string;
          recipient_count: number;
          sent_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          created_by?: string | null;
          title: string;
          message: string;
          recipient_count?: number;
          sent_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          restaurant_id?: string;
          created_by?: string | null;
          title?: string;
          message?: string;
          recipient_count?: number;
          sent_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Enums: {
      pass_platform: PassPlatform;
      pass_status: PassStatus;
    };
  };
};
