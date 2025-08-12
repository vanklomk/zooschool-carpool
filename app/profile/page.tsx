"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Car, Calendar, Bell, User, Edit } from 'lucide-react'
import { Plus, X, User2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    vehicles: [
      {
        id: 1,
        make: "Honda",
        model: "Odyssey",
        year: "2022",
        color: "Silver",
        seats: 4,
        licensePlate: "ABC-1234",
        isPrimary: true,
        image: "/modern-minivan.png",
        notes: "Family minivan with built-in car seats",
      },
      {
        id: 2,
        make: "Toyota",
        model: "Camry",
        year: "2020",
        color: "Blue",
        seats: 2,
        licensePlate: "XYZ-5678",
        isPrimary: false,
        image: "/modern-minivan.png",
        notes: "Backup car for smaller groups",
      },
    ],
    notifications: {
      email: true,
      push: true,
      sms: false,
      tripReminders: true,
      groupUpdates: true,
    },
  })

  const [showAddVehicle, setShowAddVehicle] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    seats: 4,
    licensePlate: "",
    isPrimary: false,
    image: "/modern-minivan.png",
    notes: "",
  })

  const [passengers, setPassengers] = useState([
    {
      id: 1,
      name: "Emma Johnson",
      age: 8,
      seatingRequirement: "booster",
      allergies: "",
      emergencyContact: "Sarah Johnson - (555) 234-5678",
      notes: "Needs help with seatbelt. Prefers window seat.",
      image: "/diverse-group.png",
    },
    {
      id: 2,
      name: "Liam Johnson",
      age: 5,
      seatingRequirement: "carseat",
      allergies: "Peanuts",
      emergencyContact: "Sarah Johnson - (555) 234-5678",
      notes: "Has own car seat. Needs booster for snacks.",
      image: "/diverse-group.png",
    },
  ])

  const [showAddPassenger, setShowAddPassenger] = useState(false)

  const [availabilitySchedule, setAvailabilitySchedule] = useState([
    {
      id: 1,
      name: "Monday",
      enabled: true,
      timeSlots: [
        { id: 1, name: "AM", status: "available" },
        { id: 2, name: "PM", status: "available" },
      ],
    },
    {
      id: 2,
      name: "Tuesday",
      enabled: true,
      timeSlots: [
        { id: 1, name: "AM", status: "unavailable" },
        { id: 2, name: "PM", status: "available" },
      ],
    },
    {
      id: 3,
      name: "Wednesday",
      enabled: true,
      timeSlots: [
        { id: 1, name: "AM", status: "available" },
        { id: 2, name: "PM", status: "available" },
      ],
    },
    {
      id: 4,
      name: "Thursday",
      enabled: true,
      timeSlots: [
        { id: 1, name: "AM", status: "unavailable" },
        { id: 2, name: "PM", status: "unavailable" },
      ],
    },
    {
      id: 5,
      name: "Friday",
      enabled: true,
      timeSlots: [
        { id: 1, name: "AM", status: "available" },
        { id: 2, name: "PM", status: "available" },
      ],
    },
  ])

  const [showAddEvent, setShowAddEvent] = useState(false)
  const [showAddDay, setShowAddDay] = useState(false)

  const toggleDayEnabled = (dayId: number, enabled: boolean) => {
    setAvailabilitySchedule((prev) => prev.map((day) => (day.id === dayId ? { ...day, enabled } : day)))
  }

  const updateTimeSlotName = (dayId: number, slotId: number, name: string) => {
    setAvailabilitySchedule((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              timeSlots: day.timeSlots.map((slot) => (slot.id === slotId ? { ...slot, name } : slot)),
            }
          : day,
      ),
    )
  }

  const updateTimeSlotStatus = (dayId: number, slotId: number, status: string) => {
    setAvailabilitySchedule((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              timeSlots: day.timeSlots.map((slot) => (slot.id === slotId ? { ...slot, status } : slot)),
            }
          : day,
      ),
    )
  }

  const addTimeSlot = (dayId: number) => {
    setAvailabilitySchedule((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              timeSlots: [
                ...day.timeSlots,
                {
                  id: Math.max(...day.timeSlots.map((s) => s.id)) + 1,
                  name: `Slot ${day.timeSlots.length + 1}`,
                  status: "available",
                },
              ],
            }
          : day,
      ),
    )
  }

  const removeTimeSlot = (dayId: number, slotId: number) => {
    setAvailabilitySchedule((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              timeSlots: day.timeSlots.filter((slot) => slot.id !== slotId),
            }
          : day,
      ),
    )
  }

  const removeDay = (dayId: number) => {
    setAvailabilitySchedule((prev) => prev.filter((day) => day.id !== dayId))
  }

  const addPassenger = () => {
    const newPassenger = {
      id: Math.max(...passengers.map((p) => p.id)) + 1,
      name: "",
      age: 5,
      seatingRequirement: "booster",
      allergies: "",
      emergencyContact: "",
      notes: "",
      image: "/diverse-group.png",
    }
    setPassengers([...passengers, newPassenger])
    setShowAddPassenger(false)
  }

  const removePassenger = (id: number) => {
    setPassengers(passengers.filter((p) => p.id !== id))
  }

  const updatePassenger = (id: number, field: string, value: any) => {
    setPassengers(passengers.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const addVehicle = () => {
    const vehicle = {
      ...newVehicle,
      id: Math.max(...profileData.vehicles.map((v) => v.id)) + 1,
    }

    // If this is the first vehicle or marked as primary, make it primary
    if (profileData.vehicles.length === 0 || newVehicle.isPrimary) {
      // Remove primary status from other vehicles
      const updatedVehicles = profileData.vehicles.map((v) => ({ ...v, isPrimary: false }))
      setProfileData({
        ...profileData,
        vehicles: [...updatedVehicles, { ...vehicle, isPrimary: true }],
      })
    } else {
      setProfileData({
        ...profileData,
        vehicles: [...profileData.vehicles, vehicle],
      })
    }

    resetVehicleForm()
  }

  const editVehicle = (vehicle) => {
    setEditingVehicle(vehicle)
    setNewVehicle({ ...vehicle })
    setShowAddVehicle(true)
  }

  const updateVehicle = () => {
    let updatedVehicles = profileData.vehicles.map((v) => 
      v.id === editingVehicle.id ? { ...newVehicle, id: editingVehicle.id } : v
    )

    // If this vehicle is being set as primary, remove primary from others
    if (newVehicle.isPrimary) {
      updatedVehicles = updatedVehicles.map((v) => 
        v.id === editingVehicle.id ? v : { ...v, isPrimary: false }
      )
    }

    setProfileData({
      ...profileData,
      vehicles: updatedVehicles,
    })

    resetVehicleForm()
  }

  const removeVehicle = (vehicleId) => {
    const vehicleToRemove = profileData.vehicles.find((v) => v.id === vehicleId)
    const remainingVehicles = profileData.vehicles.filter((v) => v.id !== vehicleId)

    // If removing the primary vehicle and there are others, make the first one primary
    if (vehicleToRemove?.isPrimary && remainingVehicles.length > 0) {
      remainingVehicles[0].isPrimary = true
    }

    setProfileData({
      ...profileData,
      vehicles: remainingVehicles,
    })
  }

  const setPrimaryVehicle = (vehicleId) => {
    const updatedVehicles = profileData.vehicles.map((v) => ({
      ...v,
      isPrimary: v.id === vehicleId,
    }))

    setProfileData({
      ...profileData,
      vehicles: updatedVehicles,
    })
  }

  const resetVehicleForm = () => {
    setNewVehicle({
      make: "",
      model: "",
      year: "",
      color: "",
      seats: 4,
      licensePlate: "",
      isPrimary: false,
      image: "/modern-minivan.png",
      notes: "",
    })
    setShowAddVehicle(false)
    setEditingVehicle(null)
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
            <Link href="/profile" className="text-sm font-medium text-emerald-600">
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
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/diverse-group.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{profileData.name}</h2>
                  <p className="text-sm text-gray-500">{profileData.email}</p>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Change Photo
                </Button>
              </div>
              <div className="mt-6 space-y-1">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <User className="h-4 w-4" />
                  <span>Personal Info</span>
                </Link>
                <Link
                  href="/profile/vehicle"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Car className="h-4 w-4" />
                  <span>Vehicle</span>
                </Link>
                <Link
                  href="/profile/passengers"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <User2 className="h-4 w-4" />
                  <span>Passengers</span>
                </Link>
                <Link
                  href="/profile/availability"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Availability</span>
                </Link>
                <Link
                  href="/profile/notifications"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </Link>
              </div>
            </CardContent>
          </Card>
          <div className="md:col-span-3 space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
                <TabsTrigger value="passengers">Passengers</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" defaultValue="Jane" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={profileData.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue={profileData.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" defaultValue={profileData.address} />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="vehicle">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Vehicle Information</CardTitle>
                        <CardDescription>Manage your vehicles and seating capacity</CardDescription>
                      </div>
                      <Button onClick={() => setShowAddVehicle(true)} className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Vehicle
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {profileData.vehicles.length === 0 ? (
                      <div className="text-center py-8">
                        <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No vehicles added</h3>
                        <p className="text-gray-500 mb-4">Add your vehicle information to participate in carpools</p>
                        <Button onClick={() => setShowAddVehicle(true)} className="bg-emerald-600 hover:bg-emerald-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Add First Vehicle
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {profileData.vehicles.map((vehicle) => (
                          <Card key={vehicle.id} className={`border-2 ${vehicle.isPrimary ? 'border-emerald-200 bg-emerald-50' : ''}`}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                  <img 
                                    src={vehicle.image || "/modern-minivan.png"} 
                                    alt={`${vehicle.make} ${vehicle.model}`}
                                    className="h-16 w-24 rounded-md object-cover"
                                  />
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-lg">
                                        {vehicle.year} {vehicle.make} {vehicle.model}
                                      </h3>
                                      {vehicle.isPrimary && (
                                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                                          Primary
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="text-sm text-gray-600 space-y-1">
                                      <div>Color: {vehicle.color}</div>
                                      <div>License: {vehicle.licensePlate}</div>
                                      <div>Available Seats: {vehicle.seats}</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  {!vehicle.isPrimary && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setPrimaryVehicle(vehicle.id)}
                                      className="text-xs"
                                    >
                                      Set Primary
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => editVehicle(vehicle)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeVehicle(vehicle.id)}
                                    className="text-red-600 hover:text-red-700"
                                    disabled={profileData.vehicles.length === 1}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {vehicle.notes && (
                                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                  <div className="text-sm">
                                    <div className="font-medium text-blue-800 mb-1">Notes</div>
                                    <div className="text-blue-700">{vehicle.notes}</div>
                                  </div>
                                </div>
                              )}

                              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="text-center p-2 bg-gray-50 rounded">
                                  <div className="font-medium">{vehicle.year}</div>
                                  <div className="text-gray-500 text-xs">Year</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded">
                                  <div className="font-medium">{vehicle.color}</div>
                                  <div className="text-gray-500 text-xs">Color</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded">
                                  <div className="font-medium">{vehicle.seats}</div>
                                  <div className="text-gray-500 text-xs">Seats</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded">
                                  <div className="font-medium">{vehicle.licensePlate}</div>
                                  <div className="text-gray-500 text-xs">License</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="passengers">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Passengers</CardTitle>
                        <CardDescription>Manage your children's information and seating requirements</CardDescription>
                      </div>
                      <Button onClick={addPassenger} className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Passenger
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {passengers.length === 0 ? (
                      <div className="text-center py-8">
                        <User2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No passengers added</h3>
                        <p className="text-gray-500 mb-4">
                          Add your children's information to help drivers prepare for trips
                        </p>
                        <Button onClick={addPassenger} className="bg-emerald-600 hover:bg-emerald-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Add First Passenger
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {passengers.map((passenger) => (
                          <Card key={passenger.id} className="border-2">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={passenger.image || "/placeholder.svg"} alt={passenger.name} />
                                    <AvatarFallback>{passenger.name.charAt(0) || "P"}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-medium">{passenger.name || "New Passenger"}</h3>
                                    <p className="text-sm text-gray-500">Age {passenger.age}</p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removePassenger(passenger.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Name</Label>
                                  <Input
                                    value={passenger.name}
                                    onChange={(e) => updatePassenger(passenger.id, "name", e.target.value)}
                                    placeholder="Child's name"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Age</Label>
                                  <Select
                                    value={passenger.age.toString()}
                                    onValueChange={(value) =>
                                      updatePassenger(passenger.id, "age", Number.parseInt(value))
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Array.from({ length: 15 }, (_, i) => i + 3).map((age) => (
                                        <SelectItem key={age} value={age.toString()}>
                                          {age} years old
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Seating Requirement</Label>
                                  <Select
                                    value={passenger.seatingRequirement}
                                    onValueChange={(value) =>
                                      updatePassenger(passenger.id, "seatingRequirement", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="carseat">Car Seat (Under 4)</SelectItem>
                                      <SelectItem value="booster">Booster Seat (4-8)</SelectItem>
                                      <SelectItem value="backseat">Back Seat Only (8-12)</SelectItem>
                                      <SelectItem value="any">Any Seat (12+)</SelectItem>
                                      <SelectItem value="front-ok">Front Seat OK (13+)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Allergies/Medical</Label>
                                  <Input
                                    value={passenger.allergies}
                                    onChange={(e) => updatePassenger(passenger.id, "allergies", e.target.value)}
                                    placeholder="Any allergies or medical conditions"
                                  />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <Label>Emergency Contact</Label>
                                  <Input
                                    value={passenger.emergencyContact}
                                    onChange={(e) => updatePassenger(passenger.id, "emergencyContact", e.target.value)}
                                    placeholder="Name and phone number"
                                  />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <Label>Notes for Drivers</Label>
                                  <Textarea
                                    value={passenger.notes}
                                    onChange={(e) => updatePassenger(passenger.id, "notes", e.target.value)}
                                    placeholder="Any special instructions, preferences, or important information for drivers..."
                                    rows={3}
                                  />
                                </div>
                              </div>

                              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <div className="text-sm">
                                  <div className="font-medium text-blue-800 mb-1">Driver Information</div>
                                  <div className="text-blue-700 text-xs">
                                    This information will be visible to drivers in your carpool groups to help them
                                    prepare for safe transportation.
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="availability">
                <Card>
                  <CardHeader>
                    <CardTitle>Availability Settings</CardTitle>
                    <CardDescription>Set your regular availability and blackout dates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">Weekly Schedule</h3>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => setShowAddEvent(true)}>
                              <Plus className="mr-1 h-3 w-3" />
                              Add Time Slot
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setShowAddDay(true)}>
                              <Plus className="mr-1 h-3 w-3" />
                              Add Day
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {availabilitySchedule.map((day) => (
                            <div key={day.id} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{day.name}</h4>
                                  <Switch
                                    checked={day.enabled}
                                    onCheckedChange={(checked) => toggleDayEnabled(day.id, checked)}
                                  />
                                </div>
                                {day.id > 5 && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeDay(day.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>

                              {day.enabled && (
                                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                                  {day.timeSlots.map((slot) => (
                                    <div key={slot.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                      <Input
                                        value={slot.name}
                                        onChange={(e) => updateTimeSlotName(day.id, slot.id, e.target.value)}
                                        className="flex-1 h-8 text-sm"
                                      />
                                      <Select
                                        value={slot.status}
                                        onValueChange={(value) => updateTimeSlotStatus(day.id, slot.id, value)}
                                      >
                                        <SelectTrigger className="w-24 h-8">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="available">Available</SelectItem>
                                          <SelectItem value="unavailable">Unavailable</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeTimeSlot(day.id, slot.id)}
                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addTimeSlot(day.id)}
                                    className="h-8 text-xs border-dashed"
                                  >
                                    <Plus className="mr-1 h-3 w-3" />
                                    Add Slot
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Blackout Dates</h3>
                        <p className="text-sm text-gray-500 mb-4">Select dates when you're unavailable to drive</p>
                        <div className="border rounded-md p-4">
                          <Calendar mode="multiple" className="rounded-md" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications and reminders</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Methods</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch id="email-notifications" checked={profileData.notifications.email} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications on your device</p>
                        </div>
                        <Switch id="push-notifications" checked={profileData.notifications.push} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via text message</p>
                        </div>
                        <Switch id="sms-notifications" checked={profileData.notifications.sms} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Types</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="trip-reminders">Trip Reminders</Label>
                          <p className="text-sm text-gray-500">Reminders about upcoming trips</p>
                        </div>
                        <Switch id="trip-reminders" checked={profileData.notifications.tripReminders} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="group-updates">Group Updates</Label>
                          <p className="text-sm text-gray-500">Updates about your carpool groups</p>
                        </div>
                        <Switch id="group-updates" checked={profileData.notifications.groupUpdates} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* Add/Edit Vehicle Dialog */}
        <Dialog open={showAddVehicle} onOpenChange={setShowAddVehicle}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
              <DialogDescription>
                {editingVehicle ? "Update your vehicle information" : "Add a new vehicle to your profile"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    value={newVehicle.make}
                    onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                    placeholder="Honda, Toyota, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                    placeholder="Odyssey, Sienna, etc."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={newVehicle.year}
                    onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                    placeholder="2022"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={newVehicle.color}
                    onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                    placeholder="Silver, Blue, etc."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="license">License Plate</Label>
                  <Input
                    id="license"
                    value={newVehicle.licensePlate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
                    placeholder="ABC-1234"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seats">Available Seats</Label>
                  <Select 
                    value={newVehicle.seats.toString()} 
                    onValueChange={(value) => setNewVehicle({ ...newVehicle, seats: parseInt(value) })}
                  >
                    <SelectTrigger id="seats">
                      <SelectValue placeholder="Select seats" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={newVehicle.notes}
                  onChange={(e) => setNewVehicle({ ...newVehicle, notes: e.target.value })}
                  placeholder="Any special features, car seats, or important information..."
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is-primary"
                  checked={newVehicle.isPrimary}
                  onChange={(e) => setNewVehicle({ ...newVehicle, isPrimary: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="is-primary" className="text-sm">
                  Set as primary vehicle
                </Label>
              </div>
              <div className="text-xs text-gray-500">
                Your primary vehicle will be used by default when creating new trips.
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetVehicleForm}>
                Cancel
              </Button>
              <Button
                onClick={editingVehicle ? updateVehicle : addVehicle}
                disabled={!newVehicle.make || !newVehicle.model || !newVehicle.licensePlate}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
