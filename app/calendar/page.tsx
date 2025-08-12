"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Car, Plus, CalendarIcon, AlertTriangle, PartyPopper, GraduationCap, Heart, Zap, Bell, X, Edit } from 'lucide-react'
import { format, isSameDay, parseISO } from "date-fns"

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showAddEventDialog, setShowAddEventDialog] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Labor Day - No School",
      description: "School is closed for Labor Day holiday",
      date: "2025-09-01",
      type: "holiday",
      banner: null,
      color: "red",
      affectsCarpool: true,
      createdBy: "School District",
    },
    {
      id: 2,
      title: "Field Trip to Science Museum",
      description: "3rd grade field trip to the Natural Science Museum. Different pickup/dropoff times.",
      date: "2025-08-15",
      type: "field-trip",
      banner: "Remember: Field trip permission slips due tomorrow!",
      color: "blue",
      affectsCarpool: true,
      createdBy: "Jane Doe",
      details: {
        departureTime: "8:00 AM",
        returnTime: "3:30 PM",
        location: "Natural Science Museum",
      },
    },
    {
      id: 3,
      title: "Pajama Day",
      description: "Spirit Week - Pajama Day! Kids can wear pajamas to school.",
      date: "2025-08-20",
      type: "spirit-week",
      banner: "Don't forget: It's Pajama Day tomorrow! 🩳👕",
      color: "purple",
      affectsCarpool: false,
      createdBy: "Sarah Johnson",
    },
    {
      id: 4,
      title: "Crazy Sock Day",
      description: "Spirit Week continues with Crazy Sock Day!",
      date: "2025-08-21",
      type: "spirit-week",
      banner: "Don't forget to wear your craziest socks tomorrow! 🧦✨",
      color: "green",
      affectsCarpool: false,
      createdBy: "Sarah Johnson",
    },
    {
      id: 5,
      title: "Parent-Teacher Conferences",
      description: "Half day schedule - early dismissal at 12:30 PM",
      date: "2025-08-25",
      type: "school-event",
      banner: "Early pickup today: 12:30 PM dismissal for conferences",
      color: "orange",
      affectsCarpool: true,
      createdBy: "School District",
      details: {
        dismissalTime: "12:30 PM",
        normalTime: "3:15 PM",
      },
    },
    {
      id: 6,
      title: "Valentine's Day Party",
      description: "Classroom Valentine's Day celebration",
      date: "2025-02-14",
      type: "celebration",
      banner: "Valentine's cards exchange today! 💝",
      color: "pink",
      affectsCarpool: false,
      createdBy: "Emily Davis",
    },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    type: "school-event",
    banner: "",
    color: "blue",
    affectsCarpool: false,
    details: {},
  })

  const eventTypes = [
    { value: "holiday", label: "Holiday", icon: Heart, color: "red" },
    { value: "field-trip", label: "Field Trip", icon: GraduationCap, color: "blue" },
    { value: "spirit-week", label: "Spirit Week", icon: PartyPopper, color: "purple" },
    { value: "school-event", label: "School Event", icon: CalendarIcon, color: "orange" },
    { value: "celebration", label: "Celebration", icon: PartyPopper, color: "pink" },
    { value: "alert", label: "Important Alert", icon: AlertTriangle, color: "yellow" },
    { value: "other", label: "Other", icon: Zap, color: "gray" },
  ]

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(parseISO(event.date), date))
  }

  const getTodaysBanners = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return events.filter((event) => {
      const eventDate = parseISO(event.date)
      return event.banner && (isSameDay(eventDate, today) || isSameDay(eventDate, tomorrow))
    })
  }

  const addEvent = () => {
    const event = {
      ...newEvent,
      id: Math.max(...events.map((e) => e.id)) + 1,
      createdBy: "Jane Doe", // Current user
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      description: "",
      date: "",
      type: "school-event",
      banner: "",
      color: "blue",
      affectsCarpool: false,
      details: {},
    })
    setShowAddEventDialog(false)
  }

  const editEvent = (event) => {
    setEditingEvent(event)
    setNewEvent({ ...event })
    setShowAddEventDialog(true)
  }

  const updateEvent = () => {
    setEvents(events.map((e) => (e.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : e)))
    setEditingEvent(null)
    setNewEvent({
      title: "",
      description: "",
      date: "",
      type: "school-event",
      banner: "",
      color: "blue",
      affectsCarpool: false,
      details: {},
    })
    setShowAddEventDialog(false)
  }

  const deleteEvent = (eventId) => {
    setEvents(events.filter((e) => e.id !== eventId))
  }

  const getEventTypeInfo = (type) => {
    return eventTypes.find((t) => t.value === type) || eventTypes[0]
  }

  const getColorClasses = (color) => {
    const colorMap = {
      red: "bg-red-100 text-red-800 border-red-200",
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      green: "bg-green-100 text-green-800 border-green-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      pink: "bg-pink-100 text-pink-800 border-pink-200",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      gray: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colorMap[color] || colorMap.blue
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
            <Link href="/dashboard" className="text-sm font-medium hover:text-emerald-600">
              Dashboard
            </Link>
            <Link href="/groups" className="text-sm font-medium hover:text-emerald-600">
              Groups
            </Link>
            <Link href="/schedule" className="text-sm font-medium hover:text-emerald-600">
              Schedule
            </Link>
            <Link href="/calendar" className="text-sm font-medium text-emerald-600">
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">School Calendar</h1>
          <Button onClick={() => setShowAddEventDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>

        {/* Active Banners */}
        {getTodaysBanners().length > 0 && (
          <div className="space-y-3 mb-6">
            {getTodaysBanners().map((event) => {
              const typeInfo = getEventTypeInfo(event.type)
              const Icon = typeInfo.icon
              return (
                <div key={event.id} className={`p-4 rounded-lg border-l-4 ${getBannerClasses(event.color)}`}>
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium mb-1">{event.title}</div>
                      <div className="text-sm">{event.banner}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {isSameDay(parseISO(event.date), new Date()) ? "Today" : "Tomorrow"}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select a date to view events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    hasEvents: events.map((event) => parseISO(event.date)),
                  }}
                  modifiersStyles={{
                    hasEvents: {
                      backgroundColor: "#dcfce7",
                      color: "#166534",
                      fontWeight: "bold",
                    },
                  }}
                />
                <div className="mt-4 space-y-2">
                  <div className="text-sm font-medium">Legend</div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                    <span>Has Events</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}</CardTitle>
                <CardDescription>
                  {selectedDate && getEventsForDate(selectedDate).length > 0
                    ? `${getEventsForDate(selectedDate).length} event(s) scheduled`
                    : "No events scheduled"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="space-y-4">
                    {getEventsForDate(selectedDate).length > 0 ? (
                      getEventsForDate(selectedDate).map((event) => {
                        const typeInfo = getEventTypeInfo(event.type)
                        const Icon = typeInfo.icon
                        return (
                          <Card key={event.id} className="border-l-4" style={{ borderLeftColor: typeInfo.color }}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3 flex-1">
                                  <div className={`p-2 rounded-lg ${getColorClasses(event.color)}`}>
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold">{event.title}</h3>
                                      <Badge variant="outline" className="text-xs">
                                        {typeInfo.label}
                                      </Badge>
                                      {event.affectsCarpool && (
                                        <Badge variant="outline" className="text-xs text-orange-600 border-orange-600">
                                          <Car className="mr-1 h-3 w-3" />
                                          Affects Carpool
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                                    {event.banner && (
                                      <div className={`p-2 rounded text-xs ${getBannerClasses(event.color)}`}>
                                        <Bell className="inline mr-1 h-3 w-3" />
                                        {event.banner}
                                      </div>
                                    )}
                                    {event.details && Object.keys(event.details).length > 0 && (
                                      <div className="mt-2 text-xs text-gray-500">
                                        {Object.entries(event.details).map(([key, value]) => (
                                          <div key={key}>
                                            <strong>{key.replace(/([A-Z])/g, " $1").toLowerCase()}:</strong> {value}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    <div className="text-xs text-gray-400 mt-2">Created by {event.createdBy}</div>
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm" onClick={() => editEvent(event)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteEvent(event.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })
                    ) : (
                      <div className="text-center py-8">
                        <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No events scheduled</h3>
                        <p className="text-gray-500 mb-4">Add an event to keep everyone informed</p>
                        <Button
                          onClick={() => setShowAddEventDialog(true)}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Event
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select a date</h3>
                    <p className="text-gray-500">Choose a date from the calendar to view or add events</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Add/Edit Event Dialog */}
      <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
            <DialogDescription>
              {editingEvent ? "Update the event details" : "Create a new calendar event for your group"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="e.g., Field Trip to Zoo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Provide details about the event..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Event Type</Label>
                <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner">Banner Message (Optional)</Label>
              <Input
                id="banner"
                value={newEvent.banner}
                onChange={(e) => setNewEvent({ ...newEvent, banner: e.target.value })}
                placeholder="e.g., Don't forget to wear funny socks tomorrow!"
              />
              <div className="text-xs text-gray-500">
                This message will appear as a banner on the day of or before the event
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select value={newEvent.color} onValueChange={(value) => setNewEvent({ ...newEvent, color: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">🔴 Red</SelectItem>
                    <SelectItem value="blue">🔵 Blue</SelectItem>
                    <SelectItem value="purple">🟣 Purple</SelectItem>
                    <SelectItem value="green">🟢 Green</SelectItem>
                    <SelectItem value="orange">🟠 Orange</SelectItem>
                    <SelectItem value="pink">🩷 Pink</SelectItem>
                    <SelectItem value="yellow">🟡 Yellow</SelectItem>
                    <SelectItem value="gray">⚫ Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="affects-carpool"
                  checked={newEvent.affectsCarpool}
                  onChange={(e) => setNewEvent({ ...newEvent, affectsCarpool: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="affects-carpool" className="text-sm">
                  Affects carpool schedule
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEventDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={editingEvent ? updateEvent : addEvent}
              disabled={!newEvent.title || !newEvent.date}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {editingEvent ? "Update Event" : "Add Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
