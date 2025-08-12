"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Car, Clock, Plus, Users, Bell } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { isSameDay, parseISO } from "date-fns"

export default function DashboardPage() {
  const [upcomingDrives, setUpcomingDrives] = useState([
    {
      id: 1,
      date: "Mon, Aug 6",
      time: "7:30 AM",
      group: "Zoo School NE",
      type: "Morning Drop-off",
      riders: 3,
      capacity: 4,
    },
    {
      id: 2,
      date: "Mon, Aug 6",
      time: "3:15 PM",
      group: "Zoo School NE",
      type: "Afternoon Pick-up",
      riders: 2,
      capacity: 4,
    },
    {
      id: 3,
      date: "Wed, Aug 8",
      time: "7:30 AM",
      group: "Soccer Practice",
      type: "Morning Drop-off",
      riders: 4,
      capacity: 4,
    },
  ])

  const [myGroups, setMyGroups] = useState([
    {
      id: 1,
      name: "Zoo School NE",
      members: 8,
      image: "/minimal-school-building.png",
    },
    {
      id: 2,
      name: "Soccer Practice",
      members: 6,
      image: "/minimal-soccer-field.png",
    },
    {
      id: 3,
      name: "Piano Lessons",
      members: 4,
      image: "/minimal-piano-keys.png",
    },
  ])

  // Sample events for today/tomorrow banners
  const [todaysEvents] = useState([
    {
      id: 1,
      title: "Crazy Sock Day",
      banner: "Don't forget to wear your craziest socks tomorrow! 🧦✨",
      type: "spirit-week",
      color: "green",
      date: "2025-08-21",
    },
    {
      id: 2,
      title: "Field Trip Permission Slips Due",
      banner: "Remember: Field trip permission slips due tomorrow!",
      type: "field-trip",
      color: "blue",
      date: "2025-08-15",
    },
  ])

  const getTodaysBanners = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return todaysEvents.filter((event) => {
      const eventDate = parseISO(event.date)
      return event.banner && (isSameDay(eventDate, today) || isSameDay(eventDate, tomorrow))
    })
  }

  const getBannerClasses = (color) => {
    const colorMap = {
      red: "bg-red-50 border-red-200 text-red-800",
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      green: "bg-green-50 border-green-200 text-green-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      pink: "bg-pink-50 border-pink-200 text-pink-800",
      yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
      gray: "bg-gray-50 border-gray-200 text-gray-800",
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">ZooSchool</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-emerald-600">
              Dashboard
            </Link>
            <Link href="/groups" className="text-sm font-medium hover:text-emerald-600">
              Groups
            </Link>
            <Link href="/schedule" className="text-sm font-medium hover:text-emerald-600">
              Schedule
            </Link>
            <Link href="/calendar" className="text-sm font-medium hover:text-emerald-600">
              Calendar
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
        {/* Event Banners */}
        {getTodaysBanners().length > 0 && (
          <div className="space-y-3 mb-6">
            {getTodaysBanners().map((event) => (
              <div key={event.id} className={`p-4 rounded-lg border-l-4 ${getBannerClasses(event.color)}`}>
                <div className="flex items-start gap-3">
                  <Bell className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium mb-1">{event.title}</div>
                    <div className="text-sm">{event.banner}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {isSameDay(parseISO(event.date), new Date()) ? "Today" : "Tomorrow"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" /> New Trip
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Drives</CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingDrives.length}</div>
              <p className="text-xs text-gray-500">Next: Mon, Aug 6 at 7:30 AM</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">My Groups</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myGroups.length}</div>
              <p className="text-xs text-gray-500">8 total members</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Vehicle Status</CardTitle>
              <Car className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4 seats</div>
              <p className="text-xs text-gray-500">Honda Odyssey</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="mb-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Drives</TabsTrigger>
            <TabsTrigger value="groups">My Groups</TabsTrigger>
            <TabsTrigger value="availability">My Availability</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4 pt-4">
            {upcomingDrives.map((drive) => (
              <Card key={drive.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={drive.type.includes("Morning") ? "default" : "secondary"}>{drive.type}</Badge>
                        <span className="text-sm font-medium">{drive.group}</span>
                      </div>
                      <h3 className="text-lg font-semibold mt-1">
                        {drive.date} • {drive.time}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {drive.riders} of {drive.capacity} seats filled
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/trips/${drive.id}`}>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                      <Link href={`/trips/${drive.id}`}>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          Manage
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="text-center">
              <Button variant="outline">View All Scheduled Drives</Button>
            </div>
          </TabsContent>
          <TabsContent value="groups" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myGroups.map((group) => (
                <Card key={group.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={group.image || "/placeholder.svg"} alt={group.name} />
                          <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{group.name}</h3>
                          <p className="text-sm text-gray-500">{group.members} members</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 flex justify-between">
                      <Button variant="outline" size="sm">
                        Schedule
                      </Button>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        View Group
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="border-dashed">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <Plus className="h-8 w-8 text-gray-400 mb-2" />
                  <h3 className="font-medium">Create New Group</h3>
                  <p className="text-sm text-gray-500 mb-4">Start a new carpool group</p>
                  <Button variant="outline">Create Group</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="availability" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>My Availability Calendar</CardTitle>
                <CardDescription>Set your driving availability and blackout dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center p-6 border rounded-md">
                  <div className="text-center">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Calendar View</h3>
                    <p className="text-sm text-gray-500 mb-4">Set your available days and times for driving</p>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Manage Availability</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
