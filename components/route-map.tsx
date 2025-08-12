"use client"

import { useEffect, useRef, useState } from "react"
import { GoogleMapsService, type Location } from "@/lib/google-maps"
import type { google } from "google-maps"

interface RouteMapProps {
  origin: Location
  destination: Location
  waypoints: Location[]
  onRouteCalculated?: (routeInfo: any) => void
  className?: string
}

export function RouteMap({ origin, destination, waypoints, onRouteCalculated, className }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapRef.current || !window.google || !window.google.maps) return

    // Initialize map
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center: { lat: origin.lat, lng: origin.lng },
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    })

    // Initialize directions renderer
    const renderer = new window.google.maps.DirectionsRenderer({
      draggable: false,
      suppressMarkers: false,
    })
    renderer.setMap(mapInstance)

    setMap(mapInstance)
    setDirectionsRenderer(renderer)
  }, [origin.lat, origin.lng])

  useEffect(() => {
    if (!map || !directionsRenderer || waypoints.length === 0) return

    const calculateAndDisplayRoute = async () => {
      try {
        setError(null)
        const mapsService = GoogleMapsService.getInstance()
        await mapsService.initialize()

        const result = await mapsService.optimizeRoute(origin, destination, waypoints)

        directionsRenderer.setDirections(result.route)

        if (onRouteCalculated) {
          onRouteCalculated(result)
        }
      } catch (err) {
        console.error("Error calculating route:", err)
        setError(err instanceof Error ? err.message : "Failed to calculate route")
      }
    }

    calculateAndDisplayRoute()
  }, [map, directionsRenderer, origin, destination, waypoints, onRouteCalculated])

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <div className="text-center p-6">
          <div className="text-red-600 font-medium mb-2">Route Error</div>
          <div className="text-red-700 text-sm">{error}</div>
        </div>
      </div>
    )
  }

  return <div ref={mapRef} className={className} />
}
