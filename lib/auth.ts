import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { supabase } from "./supabase"

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  address?: string
  emergency_contact?: string
  emergency_phone?: string
  created_at: string
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || "fallback-secret") as {
      userId: string
      email: string
    }

    // Get user from database
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, name, phone, address, emergency_contact, emergency_phone, created_at")
      .eq("id", decoded.userId)
      .single()

    if (error || !user) {
      return null
    }

    return user
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}
