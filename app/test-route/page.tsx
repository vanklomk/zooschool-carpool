"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GoogleMapsLoader } from "@/components/google-maps-loader"
import { RouteMap } from "@/components/route-map"
import { AddressAutocomplete } from "@/components/address-autocomplete"
import { Car, MapPin, Navigation, Plus, X } from "lucide-react"
import type { Location } from "@/lib/google-maps"

export default function TestRoutePage() {
  const [routeInfo, setRouteInfo] = useState<any>(null)
  const [customLocations, setCustomLocations] = useState<Location[]>([])

  // Test scenarios with different pickup patterns
  const testScenarios = {
    default: {
      name: "Default (3 scattered)",
      origin: { lat: 40.7282, lng: -73.7949, address: "123 Main St, Queens, NY" },
      destination: { lat: 40.7831, lng: -73.9712, address: "Central Park, Manhattan, NY" },
      waypoints: [
        { lat: 40.7128, lng: -74.006, address: "456 Broadway, Manhattan, NY" },
        { lat: 40.7589, lng: -73.9851, address: "789 Amsterdam Ave, Manhattan, NY" },
        { lat: 40.7505, lng: -73.9934, address: "321 W 42nd St, Manhattan, NY" },
      ],
    },
    close: {
      name: "Close Together (2 nearby)",
      origin: { lat: 40.7282, lng: -73.7949, address: "123 Main St, Queens, NY" },
      destination: { lat: 40.7831, lng: -73.9712, address: "Central Park, Manhattan, NY" },
      waypoints: [
        { lat: 40.758, lng: -73.9855, address: "Lincoln Center, Manhattan, NY" },
        { lat: 40.7614, lng: -73.9776, address: "Columbus Circle, Manhattan, NY" },
      ],
    },
    spread: {
      name: "Spread Out (4 distant)",
      origin: { lat: 40.7282, lng: -73.7949, address: "123 Main St, Queens, NY" },
      destination: { lat: 40.7831, lng: -73.9712, address: "Central Park, Manhattan, NY" },
      waypoints: [
        { lat: 40.8176, lng: -73.9782, address: "Washington Heights, Manhattan, NY" }, // North
        { lat: 40.7047, lng: -74.0142, address: "Financial District, Manhattan, NY" }, // South
        { lat: 40.7505, lng: -73.9342, address: "East Side, Manhattan, NY" }, // East
        { lat: 40.7505, lng: -74.0342, address: "West Side, Manhattan, NY" }, // West
      ],
    },
    linear: {
      name: "Linear Route (4 in line)",
      origin: { lat: 40.7282, lng: -73.7949, address: "123 Main St, Queens, NY" },
      destination: { lat: 40.7831, lng: -73.9712, address: "Central Park, Manhattan, NY" },
      waypoints: [
        { lat: 40.74, lng: -73.99, address: "Lower East Side, Manhattan, NY" },
        { lat: 40.75, lng: -73.985, address: "Midtown South, Manhattan, NY" },
        { lat: 40.76, lng: -73.98, address: "Midtown, Manhattan, NY" },
        { lat: 40.77, lng: -73.975, address: "Upper West Side, Manhattan, NY" },
      ],
    },
  }

  const [currentScenario, setCurrentScenario] = useState(testScenarios.default)

  const handleRouteCalculated = (route: any) => {
    setRouteInfo(route)
  }

  const addCustomLocation = (location: Location) => {
    setCustomLocations([...customLocations, location])
  }

  const removeCustomLocation = (index: number) => {
    setCustomLocations(customLocations.filter((_, i) => i !== index))
  }

  const useCustomScenario = () => {
    if (customLocations.length > 0) {
      setCurrentScenario({
        name: `Custom (${customLocations.length} locations)`,
        origin: testScenarios.default.origin,
        destination: testScenarios.default.destination,
        waypoints: customLocations,
      })
    }
  }

  const openInGoogleMaps = () => {
    const waypoints = currentScenario.waypoints.map((wp) => `${wp.lat},${wp.lng}`).join("|")
    const url = `https://www.google.com/maps/dir/${currentScenario.origin.lat},${currentScenario.origin.lng}/${waypoints}/${currentScenario.destination.lat},${currentScenario.destination.lng}`
    window.open(url, "_blank")
  }

  return (
    <GoogleMapsLoader apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Car className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-bold">ZooSchool</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-medium hover:text-emerald-600">
                Dashboard
              </Link>
              <Link href="/groups" className="text-sm font-medium hover:text-emerald-600">
                Groups
              </Link>
              <Link href="/test-route" className="text-sm font-medium text-emerald-600">
                Route Test
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/diverse-group.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 container py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Route Optimization Test</h1>
            <p className="text-gray-600">
              Test Google Maps route optimization with different pickup scenarios to see how it improves efficiency.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Scenarios</CardTitle>
                  <CardDescription>Try different pickup patterns to see optimization in action</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(testScenarios).map(([key, scenario]) => (
                    <Button
                      key={key}
                      variant={currentScenario.name === scenario.name ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setCurrentScenario(scenario)}
                    >
                      {scenario.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Locations</CardTitle>
                  <CardDescription>Add your own pickup addresses to test</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AddressAutocomplete onAddressSelect={addCustomLocation} placeholder="Enter pickup address..." />

                  {customLocations.length > 0 && (
                    <div className="space-y-2">
                      {customLocations.map((location, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-sm flex-1 truncate">{location.address}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCustomLocation(index)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={useCustomScenario}
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                        disabled={customLocations.length === 0}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Test Custom Route
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {routeInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle>Optimization Results</CardTitle>
                    <CardDescription>Google Maps automatically optimized your route</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-700">{routeInfo.totalDistance}</div>
                        <div className="text-xs text-blue-600">Total Distance</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-700">{routeInfo.totalDuration}</div>
                        <div className="text-xs text-green-600">Total Time</div>
                      </div>
                    </div>

                    {routeInfo.optimizedOrder && routeInfo.optimizedOrder.length > 0 && (
                      <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                        <div className="text-sm font-medium text-emerald-800 mb-2">Optimized Pickup Order</div>
                        <div className="text-sm text-emerald-700">
                          {routeInfo.optimizedOrder.map((index: number, i: number) => (
                            <span key={i}>
                              Pickup #{index + 1}
                              {i < routeInfo.optimizedOrder.length - 1 && " → "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button onClick={openInGoogleMaps} className="w-full bg-transparent" variant="outline">
                      <Navigation className="mr-2 h-4 w-4" />
                      Open in Google Maps
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Route Visualization</CardTitle>
                      <CardDescription>
                        Testing: <Badge variant="outline">{currentScenario.name}</Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                    <RouteMap
                      origin={currentScenario.origin}
                      destination={currentScenario.destination}
                      waypoints={currentScenario.waypoints}
                      onRouteCalculated={handleRouteCalculated}
                      className="w-full h-full"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Start Location</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Pickup Locations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Final Destination</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </GoogleMapsLoader>
  )
}
