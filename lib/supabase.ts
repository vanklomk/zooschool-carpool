import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client (for browser usage)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Database types
export type User = {
  id: string
  email: string
  name: string
  phone: string | null
  address: string | null
  emergency_contact: string | null
  emergency_phone: string | null
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      users: {
        Row: User & {
          password_hash: string
        }
        Insert: Omit<User, "id" | "created_at" | "updated_at"> & {
          id?: string
          password_hash: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<User, "id" | "created_at" | "updated_at">> & {
          password_hash?: string
          updated_at?: string
        }
      }
    }
  }
}
