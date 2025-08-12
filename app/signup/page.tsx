"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Car, Mail, User, Phone, MapPin } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: signup form, 2: email sent confirmation
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setError("Please enter your full name")
      return false
    }
    if (!formData.email || !formData.email.includes("@")) {
      setError("Please enter a valid email address")
      return false
    }
    if (!formData.phone) {
      setError("Please enter your phone number")
      return false
    }
    return true
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setError("")

    try {
      // Store user data in localStorage temporarily for profile completion
      localStorage.setItem(
        "pendingUserData",
        JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
        }),
      )

      // Use NextAuth email sign-in which will send verification email
      const result = await signIn("email", {
        email: formData.email,
        redirect: false,
      })

      if (result?.error) {
        setError("Failed to send verification email. Please try again.")
      } else {
        setSuccess(`Verification email sent to ${formData.email}`)
        setStep(2)
      }
    } catch (err) {
      setError("Failed to create account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const resendEmail = async () => {
    setLoading(true)
    setError("")

    try {
      const result = await signIn("email", {
        email: formData.email,
        redirect: false,
      })

      if (result?.error) {
        setError("Failed to resend email. Please try again.")
      } else {
        setSuccess("Verification email sent again!")
      }
    } catch (err) {
      setError("Failed to resend email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="bg-white border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">ZooSchool</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Already have an account?</span>
            <Link href="/auth/signin">
              <Button variant="outline">Log In</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          {step === 1 ? (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create Your Account</CardTitle>
                <CardDescription>Join ZooSchool to start organizing carpools with other parents</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Jane"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <Input
                        id="address"
                        type="text"
                        placeholder="123 Main St, Anytown, USA"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" className="text-emerald-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-emerald-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                    {loading ? "Sending Verification Email..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Check Your Email</CardTitle>
                <CardDescription>
                  We've sent a verification link to
                  <br />
                  <strong>{formData.email}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <AlertDescription className="text-emerald-600">{success}</AlertDescription>
                  </Alert>
                )}

                <div className="text-center space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Mail className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click the verification link in your email to complete your account setup.
                    </p>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p className="mb-2">Didn't receive the email?</p>
                    <ul className="text-xs space-y-1 mb-4">
                      <li>• Check your spam/junk folder</li>
                      <li>• Make sure you entered the correct email</li>
                      <li>• Wait a few minutes for delivery</li>
                    </ul>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={resendEmail}
                    disabled={loading}
                    className="w-full bg-transparent"
                  >
                    {loading ? "Sending..." : "Resend Verification Email"}
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="button" variant="ghost" onClick={() => setStep(1)} className="w-full">
                  Back to Sign Up
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </main>
    </div>
  )
}
