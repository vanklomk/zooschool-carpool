import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export type AuthUser = {
  userId: string
  email: string
  name: string
}

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    const jwtSecret = process.env.NEXTAUTH_SECRET || "your-secret-key-change-this"
    const decoded = jwt.verify(token, jwtSecret) as AuthUser

    return decoded
  } catch (error) {
    console.error("Auth verification error:", error)
    return null
  }
}

export function verifyAuthToken(token: string): AuthUser | null {
  try {
    const jwtSecret = process.env.NEXTAUTH_SECRET || "your-secret-key-change-this"
    const decoded = jwt.verify(token, jwtSecret) as AuthUser
    return decoded
  } catch (error) {
    return null
  }
}
