"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Car, Phone, Play, User, Navigation, Clock, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { GoogleMapsLoader } from "@/components/google-maps-loader"
import { RouteMap } from "@/components/route-map"
import Link from "next/link"

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [routeInfo, setRouteInfo] = useState<any>(null)

  const [trip, setTrip] = useState({
    id: params.id,
    date: "Monday, August 6",
    time: "7:30 AM",
    group: "Zoo School NE",
    type: "Morning Drop-off",
    driver: "You",
    destination: "Zoo School Northeast Campus",
    destinationAddress: "1234 Wildlife Way, Anytown, USA",
    departureTime: "6:55 AM",
    arrivalTime: "7:25 AM",
    riders: [
      {
        id: 1,
        name: "Emma Johnson",
        age: 8,
        address: "456 Maple Street, Anytown, USA",
        pickupTime: "7:05 AM",
        contactName: "Sarah Johnson",
        contactPhone: "(555) 234-5678",
        notes: "Has a booster seat",
        image: "/diverse-group.png",
        location: { lat: 40.7128, lng: -74.006, address: "456 Maple Street, Anytown, USA" },
      },
      {
        id: 2,
        name: "Noah Williams",
        age: 7,
        address: "789 Oak Avenue, Anytown, USA",
        pickupTime: "7:12 AM",
        contactName: "Michael Williams",
        contactPhone: "(555) 345-6789",
        notes: "Needs help with seatbelt",
        image: "/diverse-group.png",
        location: { lat: 40.7589, lng: -73.9851, address: "789 Oak Avenue, Anytown, USA" },
      },
      {
        id: 3,
        name: "Olivia Davis",
        age: 8,
        address: "321 Pine Road, Anytown, USA",
        pickupTime: "7:18 AM",
        contactName: "Emily Davis",
        contactPhone: "(555) 456-7890",
        notes: "",
        image: "/diverse-group.png",
        location: { lat: 40.7505, lng: -73.9934, address: "321 Pine Road, Anytown, USA" },
      },
    ],
    capacity: 4,
    vehicle: "Honda Odyssey",
    licensePlate: "ABC-1234",
    notes: "Remember to bring the field trip permission slips",
    origin: { lat: 40.7282, lng: -73.7949, address: "Your Home Address" },
    destinationLocation: { lat: 40.7831, lng: -73.9712, address: "1234 Wildlife Way, Anytown, USA" },
  })

  const startTrip = () => {
    router.push(`/trips/${params.id}/execute`)
  }

  const handleRouteCalculated = (route: any) => {
    setRouteInfo(route)
  }

  const openInGoogleMaps = () => {
    const waypoints = trip.riders.map((rider) => `${rider.location.lat},${rider.location.lng}`).join("|")
    const url = `https://www.google.com/maps/dir/${trip.origin.lat},${trip.origin.lng}/${waypoints}/${trip.destinationLocation.lat},${trip.destinationLocation.lng}`
    window.open(url, "_blank")
  }

  return (
    <GoogleMapsLoader apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="bg-white border-b sticky top-0 z-10 px-4">
          <div className="flex h-14 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Car className="h-5 w-5 text-emerald-600" />
              <span className="text-lg font-bold">ZooSchool</span>
            </Link>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/diverse-group.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={trip.type.includes("Morning") ? "default" : "secondary"}>{trip.type}</Badge>
              <span className="text-sm font-medium">{trip.group}</span>
            </div>
            <h1 className="text-xl font-bold mb-4">
              {trip.date} • {trip.time}
            </h1>
            <Button onClick={startTrip} size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 mb-6">
              <Play className="mr-2 h-5 w-5" /> Start Trip
            </Button>
          </div>

          <div className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Trip Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Destination</h3>
                    <p className="font-medium">{trip.destination}</p>
                    <p className="text-sm text-gray-500">{trip.destinationAddress}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Vehicle</h3>
                    <p className="font-medium">{trip.vehicle}</p>
                    <p className="text-sm text-gray-500">{trip.licensePlate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <div className="text-sm font-medium text-emerald-700">{trip.departureTime}</div>
                    <div className="text-xs text-emerald-600">Leave by</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-700">{trip.arrivalTime}</div>
                    <div className="text-xs text-blue-600">Arrive by</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium">
                      {trip.riders.length}/{trip.capacity}
                    </div>
                    <div className="text-xs text-gray-600">Passengers</div>
                  </div>
                </div>

                {routeInfo && (
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-emerald-800">Optimized Route</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={openInGoogleMaps}
                        className="text-xs h-7 bg-transparent"
                      >
                        <Navigation className="mr-1 h-3 w-3" />
                        Open in Maps
                      </Button>
                    </div>
                    <div className="text-xs text-emerald-600">
                      Total distance: {routeInfo.totalDistance} • Duration: {routeInfo.totalDuration}
                    </div>
                  </div>
                )}

                {trip.notes && (
                  <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                    <div className="text-sm font-medium text-yellow-800 mb-1">Trip Notes</div>
                    <div className="text-sm text-yellow-700">{trip.notes}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Live Route Map</CardTitle>
                    <CardDescription>Real-time optimized route with traffic</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={openInGoogleMaps}>
                    <Navigation className="mr-2 h-4 w-4" />
                    Navigate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                  <RouteMap
                    origin={trip.origin}
                    destination={trip.destinationLocation}
                    waypoints={trip.riders.map((rider) => rider.location)}
                    onRouteCalculated={handleRouteCalculated}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Passenger Pickups</CardTitle>
                <CardDescription>Optimized pickup order with real-time ETAs</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {trip.riders.map((rider, index) => (
                    <div key={rider.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">{rider.name}</div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                <Clock className="mr-1 h-3 w-3" />
                                {rider.pickupTime}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-start gap-1 mb-2">
                            <MapPin className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-500">{rider.address}</p>
                          </div>
                          {rider.notes && (
                            <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded mb-2">Note: {rider.notes}</p>
                          )}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {rider.contactName}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {rider.contactPhone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="p-4 bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-700 text-sm font-medium flex-shrink-0">
                        {trip.riders.length + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{trip.destination}</div>
                        <div className="flex items-start gap-1 mb-2">
                          <MapPin className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-500">{trip.destinationAddress}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="mr-1 h-3 w-3" />
                          Arrival: {trip.arrivalTime}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="pb-6">
              <Button onClick={startTrip} size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 h-12">
                <Play className="mr-2 h-5 w-5" /> Start Trip
              </Button>
            </div>
          </div>
        </main>
      </div>
    </GoogleMapsLoader>
  )
}
