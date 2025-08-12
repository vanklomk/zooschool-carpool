"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { CalendarIcon, Car, Check, ChevronsUpDown, MapPin } from 'lucide-react'
import { Command, CommandList, CommandInput, CommandItem, CommandGroup, CommandEmpty } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { GoogleMapsLoader } from "@/components/google-maps-loader"
import { AddressAutocomplete } from "@/components/address-autocomplete"
import type { Location } from "@/lib/google-maps"

export default function CreateTripPage() {
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState("")
  const [destination, setDestination] = useState<Location | null>(null)

  const groups = [
    { value: "zoo-school", label: "Zoo School NE" },
    { value: "soccer", label: "Soccer Practice" },
    { value: "piano", label: "Piano Lessons" },
  ]

  const [selectedChildren, setSelectedChildren] = useState([])
  const children = [
    { id: "1", name: "Emma Johnson", age: 8 },
    { id: "2", name: "Noah Williams", age: 7 },
    { id: "3", name: "Olivia Davis", age: 8 },
    { id: "4", name: "Liam Thompson", age: 8 },
  ]

  const handleDestinationSelected = (location: Location) => {
    setDestination(location)
  }

  return (
    <GoogleMapsLoader apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
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
            <h1 className="text-3xl font-bold">Create New Trip</h1>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
                <CardDescription>Schedule a new carpool trip with Google Maps integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="group">Carpool Group</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between bg-transparent"
                      >
                        {selectedGroup
                          ? groups.find((group) => group.value === selectedGroup)?.label
                          : "Select group..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search groups..." />
                        <CommandList>
                          <CommandEmpty>No group found.</CommandEmpty>
                          <CommandGroup>
                            {groups.map((group) => (
                              <CommandItem
                                key={group.value}
                                value={group.value}
                                onSelect={(currentValue) => {
                                  setSelectedGroup(currentValue === selectedGroup ? "" : currentValue)
                                  setOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedGroup === group.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {group.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <AddressAutocomplete
                      onPlaceSelected={handleDestinationSelected}
                      placeholder="Search for destination..."
                      className="pl-10"
                    />
                  </div>
                  {destination && (
                    <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">Selected: {destination.address}</div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Select>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7:30">7:30 AM (Morning Drop-off)</SelectItem>
                        <SelectItem value="8:00">8:00 AM (Morning Drop-off)</SelectItem>
                        <SelectItem value="15:00">3:00 PM (Afternoon Pick-up)</SelectItem>
                        <SelectItem value="15:30">3:30 PM (Afternoon Pick-up)</SelectItem>
                        <SelectItem value="16:00">4:00 PM (Afternoon Pick-up)</SelectItem>
                        <SelectItem value="custom">Custom Time...</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trip-type">Trip Type</Label>
                  <Select>
                    <SelectTrigger id="trip-type">
                      <SelectValue placeholder="Select trip type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning Drop-off</SelectItem>
                      <SelectItem value="afternoon">Afternoon Pick-up</SelectItem>
                      <SelectItem value="activity">Activity Transport</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driver">Driver</Label>
                  <Select defaultValue="me">
                    <SelectTrigger id="driver">
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="me">Me (Jane Doe)</SelectItem>
                      <SelectItem value="volunteer">Request Volunteer</SelectItem>
                      <SelectItem value="rotation">Use Group Rotation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Available Seats</Label>
                  <Select defaultValue="4">
                    <SelectTrigger>
                      <SelectValue placeholder="Select seats" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 seat</SelectItem>
                      <SelectItem value="2">2 seats</SelectItem>
                      <SelectItem value="3">3 seats</SelectItem>
                      <SelectItem value="4">4 seats</SelectItem>
                      <SelectItem value="5">5 seats</SelectItem>
                      <SelectItem value="6">6 seats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Children</Label>
                  <div className="border rounded-md p-4 space-y-2">
                    {children.map((child) => (
                      <div key={child.id} className="flex items-center space-x-2">
                        <Checkbox id={`child-${child.id}`} />
                        <label
                          htmlFor={`child-${child.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {child.name} ({child.age})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea placeholder="Any special instructions or notes for this trip..." id="notes" />
                </div>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-blue-800">Google Maps Integration</div>
                      <div className="text-blue-700">
                        Route will be automatically optimized for pickup efficiency with real-time traffic updates.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Create Trip</Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </GoogleMapsLoader>
  )
}
