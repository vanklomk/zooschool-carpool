"use client"

import type React from "react"

import { useEffect, useState } from "react"
import type { google } from "google-maps"

interface GoogleMapsLoaderProps {
  apiKey: string
  children: React.ReactNode
}

declare global {
  interface Window {
    google: typeof google
    initMap: () => void
  }
}

export function GoogleMapsLoader({ apiKey, children }: GoogleMapsLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!apiKey) {
      setError("Google Maps API key is required. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.")
      return
    }

    if (window.google && window.google.maps) {
      setIsLoaded(true)
      return
    }

    // Set up the callback function
    window.initMap = () => {
      setIsLoaded(true)
    }

    // Load the Google Maps script
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`
    script.async = true
    script.defer = true
    script.onerror = () => {
      setError("Failed to load Google Maps. Please check your API key and internet connection.")
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`)
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
      delete window.initMap
    }
  }, [apiKey])

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center p-6">
          <div className="text-red-600 font-semibold mb-2">Google Maps Error</div>
          <div className="text-red-700 text-sm max-w-md">{error}</div>
          <div className="mt-4 text-xs text-red-600">
            Need help? Check the console for more details or visit the Google Maps API documentation.
          </div>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50 border border-gray-200 rounded-lg">
        <div className="text-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <div className="text-gray-600 font-medium">Loading Google Maps...</div>
          <div className="text-gray-500 text-sm mt-2">This may take a few seconds</div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
