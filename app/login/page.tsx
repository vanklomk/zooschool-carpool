"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Car, Mail, Lock } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: login form, 2: verification code
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simulate API call to authenticate and send verification code
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate a mock verification code
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      setSentCode(code)
      
      setSuccess(`Verification code sent to ${formData.email}`)
      setStep(2)
      
      // In a real app, you would make an API call here:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!verificationCode) {
      setError("Please enter the verification code")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if code matches (in real app, this would be server-side)
      if (verificationCode === sentCode) {
        setSuccess("Login successful!")
        
        // Simulate login and redirect
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else {
        setError("Invalid verification code. Please try again.")
      }
      
    } catch (err) {
      setError("Verification failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const resendCode = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newCode = Math.floor(100000 + Math.random() * 900000).toString()
      setSentCode(newCode)
      setSuccess("New verification code sent!")
    } catch (err) {
      setError("Failed to resend code")
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
            <span className="text-sm text-gray-600">Don't have an account?</span>
            <Link href="/signup">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          {step === 1 ? (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your ZooSchool account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

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
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="remember" className="rounded" />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-emerald-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700" 
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Verify Your Identity</CardTitle>
                <CardDescription>
                  We've sent a 6-digit verification code to<br />
                  <strong>{formData.email}</strong>
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleVerifyCode}>
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

                  <div className="space-y-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="text-center text-lg tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Didn't receive the code?
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={resendCode}
                      disabled={loading}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      Resend Code
                    </Button>
                  </div>

                  {/* Development helper - remove in production */}
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-xs">
                    <strong>Development Mode:</strong> Use code <code className="bg-yellow-100 px-1 rounded">{sentCode}</code>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700" 
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify & Sign In"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="w-full"
                  >
                    Back to Sign In
                  </Button>
                </CardFooter>
              </form>
            </>
          )}
        </Card>
      </main>
    </div>
  )
}
