"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Check, ChevronRight, Clock, MapPin, MessageSquare, Navigation, Phone, Play, User, Send } from 'lucide-react'
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function TripExecutePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [tripStarted, setTripStarted] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [messageOpen, setMessageOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [messageText, setMessageText] = useState("")
  const [messageTemplate, setMessageTemplate] = useState("")

  const messageTemplates = [
    { value: "on-way", text: "Hi! I'm on my way to pick up [CHILD_NAME]. I'll be there in about [ETA] minutes." },
    { value: "arrived", text: "I've arrived for pickup! I'm outside in a [VEHICLE_COLOR] [VEHICLE_MODEL]." },
    { value: "running-late", text: "Hi, I'm running about 5 minutes late for pickup. Sorry for the delay!" },
    { value: "traffic", text: "There's unexpected traffic. I'll be about 10 minutes late for pickup." },
    { value: "completed", text: "[CHILD_NAME] has been safely dropped off at school. Have a great day!" },
    { value: "custom", text: "" },
  ]

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
    totalDuration: 30,
    vehicle: { color: "Silver", model: "Honda Odyssey" },
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
        eta: "5 min",
        distance: "1.2 miles",
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
        eta: "7 min",
        distance: "1.8 miles",
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
        eta: "6 min",
        distance: "1.5 miles",
      },
    ],
    capacity: 4,
    licensePlate: "ABC-1234",
    notes: "Remember to bring the field trip permission slips",
  })

  const allSteps = [
    { type: "start", label: "Start Trip" },
    ...trip.riders.map((rider) => ({ type: "pickup", rider })),
    { type: "destination", label: "Arrive at Destination" },
  ]

  useEffect(() => {
    if (tripStarted) {
      const timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
        setCurrentTime(new Date())
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [tripStarted])

  const startTrip = () => {
    setTripStarted(true)
    setCurrentStep(1)
  }

  const completeCurrentStep = () => {
    if (currentStep < allSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push(`/trips/${params.id}/complete`)
    }
  }

  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hrs > 0 ? hrs + "h " : ""}${mins}m`
  }

  const progressPercentage = tripStarted ? (currentStep / (allSteps.length - 1)) * 100 : 0

  const openMessage = (contact) => {
    setSelectedContact(contact)
    setMessageOpen(true)
    setMessageText("")
    setMessageTemplate("")
  }

  const handleTemplateChange = (template) => {
    setMessageTemplate(template)
    const selectedTemplate = messageTemplates.find((t) => t.value === template)
    if (selectedTemplate && selectedTemplate.text) {
      let text = selectedTemplate.text
      if (selectedContact) {
        text = text.replace("[CHILD_NAME]", selectedContact.name)
        text = text.replace("[ETA]", selectedContact.eta?.replace(" min", ""))
        text = text.replace("[VEHICLE_COLOR]", trip.vehicle.color)
        text = text.replace("[VEHICLE_MODEL]", trip.vehicle.model)
      }
      setMessageText(text)
    }
  }

  const sendMessage = () => {
    // In a real app, this would send the SMS
    console.log(`Sending SMS to ${selectedContact.contactPhone}: ${messageText}`)
    setMessageOpen(false)
    setSelectedContact(null)
    setMessageText("")
    setMessageTemplate("")
  }

  const getCurrentStepContent = () => {
    const step = allSteps[currentStep]

    if (!tripStarted) {
      return (
        <div className="text-center p-6">
          <div className="mb-6">
            <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Play className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Ready to Start?</h2>
            <p className="text-gray-500 mb-6">Your route is optimized and ready. Tap to begin navigation.</p>
          </div>
          <Button onClick={startTrip} size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 h-12">
            <Play className="mr-2 h-5 w-5" /> Start Trip
          </Button>
        </div>
      )
    }

    if (step.type === "pickup") {
      const rider = step.rider
      return (
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Pickup #{currentStep}</h2>
              <p className="text-gray-500">Next passenger</p>
            </div>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {rider.pickupTime}
            </Badge>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={rider.image || "/placeholder.svg"} alt={rider.name} />
              <AvatarFallback className="text-lg">{rider.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-lg font-semibold">{rider.name}</div>
              <div className="text-sm text-gray-500">Age {rider.age}</div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="font-medium">Pickup Address</div>
                <div className="text-sm text-gray-500 mt-1">{rider.address}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-gray-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="font-medium">Parent Contact</div>
                <div className="text-sm text-gray-500 mt-1">
                  {rider.contactName} • {rider.contactPhone}
                </div>
              </div>
            </div>

            {rider.notes && (
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-1">Special Notes</div>
                <div className="text-sm text-blue-700">{rider.notes}</div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-6 p-3 bg-emerald-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">ETA: {rider.eta}</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">{rider.distance}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-12 bg-transparent"
                onClick={() => window.open(`tel:${rider.contactPhone}`)}
              >
                <Phone className="mr-2 h-4 w-4" /> Call
              </Button>
              <Button variant="outline" className="h-12 bg-transparent" onClick={() => openMessage(rider)}>
                <MessageSquare className="mr-2 h-4 w-4" /> Text
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 bg-transparent"
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(rider.address)}`)}
            >
              <Navigation className="mr-2 h-4 w-4" /> Navigate
            </Button>

            <Button onClick={completeCurrentStep} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700">
              <Check className="mr-2 h-4 w-4" /> Picked Up
            </Button>
          </div>
        </div>
      )
    }

    if (step.type === "destination") {
      return (
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Final Stop</h2>
              <p className="text-gray-500">Destination</p>
            </div>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {trip.arrivalTime}
            </Badge>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="font-medium">{trip.destination}</div>
                <div className="text-sm text-gray-500 mt-1">{trip.destinationAddress}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 p-3 bg-emerald-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">ETA: 7 min</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">1.8 miles</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 bg-transparent"
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(trip.destinationAddress)}`)}
            >
              <Navigation className="mr-2 h-4 w-4" /> Navigate
            </Button>

            <Button onClick={completeCurrentStep} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700">
              <Check className="mr-2 h-4 w-4" /> Arrived
            </Button>
          </div>
        </div>
      )
    }

    return null
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
            {tripStarted && (
              <Badge variant="outline" className="text-xs">
                {formatTime(Math.floor(elapsedTime / 60))}
              </Badge>
            )}
            <Avatar className="h-8 w-8">
              <AvatarImage src="/diverse-group.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-sm mx-auto">
          <div className="mb-4">
            <Badge variant={trip.type.includes("Morning") ? "default" : "secondary"} className="mb-2">
              {trip.type}
            </Badge>
            <h1 className="text-lg font-bold">{trip.destination}</h1>
          </div>

          <div className="mb-6">
            <Progress value={progressPercentage} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <div>Start</div>
              <div>Destination</div>
            </div>
          </div>

          <Card className="mb-6 shadow-sm">
            <CardContent className="p-0">{getCurrentStepContent()}</CardContent>
          </Card>

          {tripStarted && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 px-1">Trip Progress</h3>
              <div className="space-y-2">
                {allSteps.map((step, index) => {
                  const isCompleted = index < currentStep
                  const isCurrent = index === currentStep
                  const isPending = index > currentStep

                  return (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-lg ${
                        isCurrent ? "bg-emerald-50 border border-emerald-100" : "bg-white"
                      } shadow-sm`}
                    >
                      <div
                        className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium flex-shrink-0 ${
                          isCompleted
                            ? "bg-emerald-100 text-emerald-700"
                            : isCurrent
                              ? "bg-emerald-500 text-white"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isCompleted ? <Check className="h-4 w-4" /> : index}
                      </div>
                      <div className="ml-3 flex-1">
                        {step.type === "start" && <div className="font-medium">Start Trip</div>}
                        {step.type === "pickup" && (
                          <div>
                            <div className="font-medium">{step.rider.name}</div>
                            <div className="text-xs text-gray-500 truncate">{step.rider.address}</div>
                          </div>
                        )}
                        {step.type === "destination" && (
                          <div>
                            <div className="font-medium">{trip.destination}</div>
                            <div className="text-xs text-gray-500">Final destination</div>
                          </div>
                        )}
                      </div>
                      {isPending && <ChevronRight className="h-4 w-4 text-gray-400" />}
                      {isCompleted && <Check className="h-4 w-4 text-emerald-500" />}
                      {isCurrent && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Now
                        </Badge>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>Send a text message to {selectedContact?.contactName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Quick Templates</label>
              <Select value={messageTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template..." />
                </SelectTrigger>
                <SelectContent>
                  {messageTemplates.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.value === "on-way" && "On my way"}
                      {template.value === "arrived" && "I've arrived"}
                      {template.value === "running-late" && "Running late"}
                      {template.value === "traffic" && "Traffic delay"}
                      {template.value === "completed" && "Drop-off complete"}
                      {template.value === "custom" && "Custom message"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
            <div className="text-xs text-gray-500">
              To: {selectedContact?.contactName} ({selectedContact?.contactPhone})
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setMessageOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              onClick={sendMessage}
              disabled={!messageText.trim()}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
            >
              <Send className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
