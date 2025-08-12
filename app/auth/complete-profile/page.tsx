"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Phone, MapPin, AlertTriangle } from "lucide-react"

export default function CompleteProfile() {
  const { data: session, update, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  })

  useEffect(() => {
    const loadUserData = async () => {
      if (status === "loading") return

      if (status === "unauthenticated") {
        router.push("/auth/signin")
        return
      }

      if (session?.user) {
        // Load any stored signup data
        const storedData = localStorage.getItem("pendingUserData")
        if (storedData) {
          try {
            const userData = JSON.parse(storedData)
            setFormData((prev) => ({
              ...prev,
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              phone: userData.phone || "",
              address: userData.address || "",
            }))
            // Clear stored data after loading
            localStorage.removeItem("pendingUserData")
          } catch (error) {
            console.error("Error loading stored user data:", error)
          }
        }

        // Check if profile is already completed
        try {
          const response = await fetch("/api/user/profile")
          if (response.ok) {
            const { data } = await response.json()
            if (data?.profile_completed) {
              router.push("/dashboard")
              return
            }

            // Load existing profile data if any
            if (data) {
              setFormData({
                firstName: data.first_name || "",
                lastName: data.last_name || "",
                phone: data.phone || "",
                address: data.address || "",
                emergencyContactName: data.emergency_contact_name || "",
                emergencyContactPhone: data.emergency_contact_phone || "",
              })
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error)
        }
      }
    }

    loadUserData()
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          profileCompleted: true,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      // Update the session
      await update()

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      setError("Failed to complete profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="text-gray-600 mt-2">Help us set up your carpool account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Please provide your information to complete your ZooSchool Carpool account setup.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="address" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Home Address *
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St, City, State 12345"
                  required
                  disabled={isLoading}
                  rows={3}
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                    <Input
                      id="emergencyContactName"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                    <Input
                      id="emergencyContactPhone"
                      name="emergencyContactPhone"
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing Profile...
                  </>
                ) : (
                  "Complete Profile & Continue"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
