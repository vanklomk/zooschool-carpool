import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client (for browser usage)
export const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Database types
export type User = {
  id: string
  email: string
  first_name: string
  last_name: string
  name: string
  phone: string | null
  profile_completed: boolean
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, "id" | "name" | "created_at" | "updated_at"> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<User, "id" | "name" | "created_at" | "updated_at">> & {
          updated_at?: string
        }
      }
    }
  }
}
