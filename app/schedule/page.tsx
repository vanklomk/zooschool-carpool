"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Car, ChevronLeft, ChevronRight, Clock, Plus } from 'lucide-react'
import { format } from "date-fns"

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedGroup, setSelectedGroup] = useState("all")

  const [scheduledTrips, setScheduledTrips] = useState([
    {
      id: 1,
      date: "Monday, August 6",
      time: "7:30 AM",
      group: "Zoo School NE",
      type: "Morning Drop-off",
      driver: "Sarah Johnson",
      riders: [
        { name: "Emma Johnson", age: 8 },
        { name: "Noah Williams", age: 7 },
        { name: "Olivia Davis", age: 8 },
      ],
      capacity: 4,
    },
    {
      id: 2,
      date: "Monday, August 6",
      time: "3:15 PM",
      group: "Zoo School NE",
      type: "Afternoon Pick-up",
      driver: "Michael Brown",
      riders: [
        { name: "Emma Johnson", age: 8 },
        { name: "Noah Williams", age: 7 },
      ],
      capacity: 4,
    },
    {
      id: 3,
      date: "Wednesday, August 8",
      time: "7:30 AM",
      group: "Soccer Practice",
      type: "Morning Drop-off",
      driver: "You",
      riders: [
        { name: "Sophia Martinez", age: 9 },
        { name: "Liam Thompson", age: 8 },
        { name: "Ava Garcia", age: 9 },
        { name: "Mason Rodriguez", age: 8 },
      ],
      capacity: 4,
    },
  ])

  return (
    <div className="flex min-h-screen flex-col">
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
            <Link href="/schedule" className="text-sm font-medium text-emerald-600">
              Schedule
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:text-emerald-600">
              Profile
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Schedule</h1>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" /> New Trip
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Filter by Group</label>
                    <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Groups</SelectItem>
                        <SelectItem value="zoo-school">Zoo School NE</SelectItem>
                        <SelectItem value="soccer">Soccer Practice</SelectItem>
                        <SelectItem value="piano">Piano Lessons</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Trip Type</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select trip type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Trips</SelectItem>
                        <SelectItem value="morning">Morning Drop-offs</SelectItem>
                        <SelectItem value="afternoon">Afternoon Pick-ups</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">My Role</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Trips</SelectItem>
                        <SelectItem value="driver">I'm Driving</SelectItem>
                        <SelectItem value="rider">My Kids are Riding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>August 2025</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list" className="mb-6">
                  <TabsList>
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                  </TabsList>
                  <TabsContent value="list" className="space-y-4 pt-4">
                    {scheduledTrips.map((trip) => (
                      <Card key={trip.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={trip.type.includes("Morning") ? "default" : "secondary"}>
                                  {trip.type}
                                </Badge>
                                <span className="text-sm font-medium">{trip.group}</span>
                              </div>
                              <h3 className="text-lg font-semibold">
                                {trip.date} • {trip.time}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="h-3 w-3 text-gray-500" />
                                <span className="text-sm text-gray-500">Driver: {trip.driver}</span>
                              </div>
                              <div className="mt-2">
                                <div className="text-sm">
                                  {trip.riders.length} of {trip.capacity} seats filled
                                </div>
                                <div className="flex -space-x-2 mt-1">
                                  {trip.riders.map((rider, index) => (
                                    <Avatar key={index} className="border-2 border-white h-6 w-6">
                                      <AvatarFallback className="text-xs">{rider.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 self-end md:self-center">
                              <Button variant="outline" size="sm">
                                Details
                              </Button>
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                {trip.driver === "You" ? "Edit" : "Join"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  <TabsContent value="calendar" className="pt-4">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Calendar View</h3>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Event
                          </Button>
                        </div>
                      </div>

                      <Card>
                        <CardContent className="p-6">
                          <div className="mb-4">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              className="rounded-md border w-full"
                              modifiers={{
                                hasTrips: scheduledTrips.map(trip => {
                                  // Convert trip dates to Date objects for calendar highlighting
                                  const [dayName, month, day] = trip.date.split(', ')[0].split(' ')
                                  const year = 2025 // Assuming current year
                                  const monthNum = new Date(`${month} 1, ${year}`).getMonth()
                                  return new Date(year, monthNum, parseInt(day))
                                })
                              }}
                              modifiersStyles={{
                                hasTrips: {
                                  backgroundColor: '#dcfce7',
                                  color: '#166534',
                                  fontWeight: 'bold'
                                }
                              }}
                            />
                          </div>

                          {date && (
                            <div className="border-t pt-4">
                              <h4 className="font-medium mb-3">
                                Trips on {format(date, 'EEEE, MMMM d, yyyy')}
                              </h4>
                              <div className="space-y-2">
                                {scheduledTrips
                                  .filter(trip => {
                                    // Simple date matching - in a real app you'd want more robust date handling
                                    const tripDate = trip.date.toLowerCase()
                                    const selectedDate = format(date, 'EEEE, MMMM d').toLowerCase()
                                    return tripDate.includes(selectedDate.split(',')[0]) // Match day name
                                  })
                                  .map((trip) => (
                                    <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <Badge variant={trip.type.includes("Morning") ? "default" : "secondary"}>
                                            {trip.type}
                                          </Badge>
                                          <span className="font-medium">{trip.time}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                          {trip.group} • Driver: {trip.driver}
                                        </div>
                                      </div>
                                      <Button variant="outline" size="sm">
                                        Details
                                      </Button>
                                    </div>
                                  ))}
                                {scheduledTrips.filter(trip => {
                                  const tripDate = trip.date.toLowerCase()
                                  const selectedDate = format(date, 'EEEE, MMMM d').toLowerCase()
                                  return tripDate.includes(selectedDate.split(',')[0])
                                }).length === 0 && (
                                  <div className="text-center py-4 text-gray-500">
                                    No trips scheduled for this date
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
