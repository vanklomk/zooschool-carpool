import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>A sign-in link has been sent to your email address.</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Click the link in the email to sign in to your account. The link will expire in 24 hours.
          </p>
          <div className="text-sm text-muted-foreground">
            Didn't receive the email?{" "}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Try again
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
