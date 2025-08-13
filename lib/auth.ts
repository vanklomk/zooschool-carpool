import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export interface AuthUser {
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

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || "fallback-secret-key") as AuthUser
    return decoded
  } catch (error) {
    console.error("Auth verification error:", error)
    return null
  }
}

export function createAuthToken(user: { id: string; email: string; name: string }): string {
  return jwt.sign(
    { userId: user.id, email: user.email, name: user.name },
    process.env.NEXTAUTH_SECRET || "fallback-secret-key",
    { expiresIn: "7d" },
  )
}
