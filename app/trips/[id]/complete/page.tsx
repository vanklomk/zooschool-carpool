"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Car, Check, Clock, Home, Star } from 'lucide-react'
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function TripCompletePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [notes, setNotes] = useState("")

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
    actualArrivalTime: "7:23 AM",
    tripDuration: "28 minutes",
    riders: [
      {
        id: 1,
        name: "Emma Johnson",
        age: 8,
        image: "/diverse-group.png",
      },
      {
        id: 2,
        name: "Noah Williams",
        age: 7,
        image: "/diverse-group.png",
      },
      {
        id: 3,
        name: "Olivia Davis",
        age: 8,
        image: "/diverse-group.png",
      },
    ],
  })

  const finishTrip = () => {
    router.push("/dashboard")
  }

  return (
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
        <div className="max-w-sm mx-auto">
          <Card className="mb-6 shadow-sm">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl">Trip Complete!</CardTitle>
              <CardDescription>All passengers safely delivered</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Date</div>
                  <div className="font-medium">{trip.date}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-medium">{trip.tripDuration}</div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg">
                <div className="text-sm text-emerald-600 mb-1">Arrived at</div>
                <div className="font-medium text-emerald-800">{trip.destination}</div>
                <div className="text-sm text-emerald-600">{trip.actualArrivalTime}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Passengers ({trip.riders.length})</div>
                <div className="flex flex-wrap gap-2">
                  {trip.riders.map((rider) => (
                    <div key={rider.id} className="flex items-center gap-2 bg-white rounded-full pl-1 pr-3 py-1 border">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={rider.image || "/placeholder.svg"} alt={rider.name} />
                        <AvatarFallback className="text-xs">{rider.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{rider.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Trip Notes</div>
                <Textarea
                  placeholder="Add any notes about this trip (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button onClick={finishTrip} size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 h-12">
                <Home className="mr-2 h-5 w-5" /> Back to Dashboard
              </Button>
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">Rate your trip</div>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button key={rating} className="text-gray-300 hover:text-yellow-400 p-1">
                      <Star className="h-6 w-6" />
                    </button>
                  ))}
                </div>
              </div>
            </CardFooter>
          </Card>

          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium">What's Next?</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 bg-transparent">
                <Clock className="mr-2 h-4 w-4" /> Schedule
              </Button>
              <Button variant="outline" className="h-12 bg-transparent">
                <Car className="mr-2 h-4 w-4" /> New Trip
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
