"use client"

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Car, Calendar, MessageSquare, Copy, RefreshCw, Shield, UserPlus, UserMinus, Crown, Clock, Users } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  const [currentUserId] = useState(1) // Current user ID
  const [showJoinCodeDialog, setShowJoinCodeDialog] = useState(false)
  const [showRemoveMemberDialog, setShowRemoveMemberDialog] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [joinCode, setJoinCode] = useState("ABC123XY")

  const [group, setGroup] = useState({
    id: params.id,
    name: "Zoo School NE",
    description: "Parents on the northeast side driving to Zoo School",
    createdBy: 1, // User ID of creator
    joinCode: "ABC123XY",
    members: [
      {
        id: 1,
        name: "Jane Doe",
        role: "admin",
        vehicle: "Honda Odyssey",
        seats: 4,
        image: "/diverse-group.png",
        joinedDate: "2024-01-15",
        isCreator: true,
      },
      {
        id: 2,
        name: "John Smith",
        role: "admin",
        vehicle: "Toyota Sienna",
        seats: 6,
        image: "/diverse-group.png",
        joinedDate: "2024-01-20",
        isCreator: false,
      },
      {
        id: 3,
        name: "Sarah Johnson",
        role: "member",
        vehicle: "Subaru Outback",
        seats: 3,
        image: "/diverse-group.png",
        joinedDate: "2024-02-01",
        isCreator: false,
      },
      {
        id: 4,
        name: "Michael Brown",
        role: "member",
        vehicle: "Honda Pilot",
        seats: 5,
        image: "/diverse-group.png",
        joinedDate: "2024-02-10",
        isCreator: false,
      },
      {
        id: 5,
        name: "Emily Davis",
        role: "member",
        vehicle: "Kia Carnival",
        seats: 6,
        image: "/diverse-group.png",
        joinedDate: "2024-02-15",
        isCreator: false,
      },
    ],
    pendingRequests: [
      {
        id: 6,
        name: "Lisa Wilson",
        email: "lisa.wilson@email.com",
        vehicle: "Ford Explorer",
        seats: 5,
        message:
          "Hi! I live on Maple Street and would love to join the carpool for Zoo School. My daughter Emma is in 2nd grade.",
        requestDate: "2024-03-01",
        image: "/diverse-group.png",
      },
      {
        id: 7,
        name: "David Martinez",
        email: "david.martinez@email.com",
        vehicle: "Chevrolet Tahoe",
        seats: 7,
        message: "Looking to join the Zoo School carpool group. I can drive on Tuesdays and Thursdays.",
        requestDate: "2024-03-02",
        image: "/diverse-group.png",
      },
    ],
    schedule: [
      {
        id: 1,
        date: "Monday, August 6",
        time: "7:30 AM",
        type: "Morning Drop-off",
        driver: "Sarah Johnson",
        riders: ["Emma Johnson", "Noah Williams", "Olivia Davis"],
        capacity: 4,
      },
      {
        id: 2,
        date: "Monday, August 6",
        time: "3:15 PM",
        type: "Afternoon Pick-up",
        driver: "Michael Brown",
        riders: ["Emma Johnson", "Noah Williams"],
        capacity: 4,
      },
      {
        id: 3,
        date: "Tuesday, August 7",
        time: "7:30 AM",
        type: "Morning Drop-off",
        driver: "John Smith",
        riders: ["Sophia Martinez", "Liam Thompson", "Ava Garcia", "Mason Rodriguez"],
        capacity: 6,
      },
    ],
    discussions: [
      {
        id: 1,
        author: "Jane Doe",
        date: "August 3, 2025",
        content: "Just a reminder that school starts 30 minutes earlier next Monday due to the assembly.",
        replies: 3,
      },
      {
        id: 2,
        author: "Sarah Johnson",
        date: "August 2, 2025",
        content: "I'll be out of town August 15-20. Can someone cover my driving days?",
        replies: 5,
      },
    ],
  })

  const isAdmin = () => {
    const currentUser = group.members.find((m) => m.id === currentUserId)
    return currentUser?.role === "admin"
  }

  const generateNewJoinCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setJoinCode(result)
    setGroup((prev) => ({ ...prev, joinCode: result }))
    toast({
      title: "New join code generated",
      description: "The new code is ready to share with potential members.",
    })
  }

  const copyJoinCode = () => {
    navigator.clipboard.writeText(joinCode)
    toast({
      title: "Join code copied",
      description: "The join code has been copied to your clipboard.",
    })
  }

  const approveMember = (requestId: number) => {
    const request = group.pendingRequests.find((r) => r.id === requestId)
    if (request) {
      const newMember = {
        id: request.id,
        name: request.name,
        role: "member",
        vehicle: request.vehicle,
        seats: request.seats,
        image: request.image,
        joinedDate: new Date().toISOString().split("T")[0],
        isCreator: false,
      }

      setGroup((prev) => ({
        ...prev,
        members: [...prev.members, newMember],
        pendingRequests: prev.pendingRequests.filter((r) => r.id !== requestId),
      }))

      toast({
        title: "Member approved",
        description: `${request.name} has been added to the group.`,
      })
    }
  }

  const rejectMember = (requestId: number) => {
    const request = group.pendingRequests.find((r) => r.id === requestId)
    setGroup((prev) => ({
      ...prev,
      pendingRequests: prev.pendingRequests.filter((r) => r.id !== requestId),
    }))

    toast({
      title: "Request rejected",
      description: `${request?.name}'s request has been declined.`,
    })
  }

  const toggleMemberRole = (memberId: number) => {
    setGroup((prev) => ({
      ...prev,
      members: prev.members.map((member) =>
        member.id === memberId ? { ...member, role: member.role === "admin" ? "member" : "admin" } : member,
      ),
    }))

    const member = group.members.find((m) => m.id === memberId)
    const newRole = member?.role === "admin" ? "member" : "admin"

    toast({
      title: `Role updated`,
      description: `${member?.name} is now ${newRole === "admin" ? "an admin" : "a member"}.`,
    })
  }

  const removeMember = (memberId: number) => {
    const member = group.members.find((m) => m.id === memberId)
    if (member?.isCreator) {
      toast({
        title: "Cannot remove creator",
        description: "The group creator cannot be removed from the group.",
        variant: "destructive",
      })
      return
    }

    setGroup((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== memberId),
    }))

    toast({
      title: "Member removed",
      description: `${member?.name} has been removed from the group.`,
    })

    setShowRemoveMemberDialog(false)
    setSelectedMember(null)
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
            <Link href="/groups" className="text-sm font-medium text-emerald-600">
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
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/traditional-schoolhouse.png" alt={group.name} />
              <AvatarFallback>ZS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{group.name}</h1>
              <p className="text-gray-500">{group.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Trip
            </Button>
          </div>
        </div>

        <Tabs defaultValue="schedule" className="mb-6">
          <TabsList>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="members">
              Members
              {group.pendingRequests.length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {group.pendingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            {isAdmin() && <TabsTrigger value="admin">Admin</TabsTrigger>}
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Trips</CardTitle>
                <CardDescription>View and manage upcoming carpool trips for this group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group.schedule.map((trip) => (
                    <Card key={trip.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={trip.type.includes("Morning") ? "default" : "secondary"}>
                                {trip.type}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold">
                              {trip.date} • {trip.time}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Car className="h-3 w-3 text-gray-500" />
                              <span className="text-sm text-gray-500">Driver: {trip.driver}</span>
                            </div>
                            <div className="mt-2">
                              <div className="text-sm">
                                {trip.riders.length} of {trip.capacity} seats filled
                              </div>
                              <div className="flex -space-x-2 mt-1">
                                {trip.riders.map((rider, index) => (
                                  <Avatar key={index} className="border-2 border-white h-6 w-6">
                                    <AvatarFallback className="text-xs">{rider.charAt(0)}</AvatarFallback>
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
                              Join
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="pt-4">
            <div className="space-y-6">
              {isAdmin() && group.pendingRequests.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      Pending Requests
                      <Badge variant="destructive">{group.pendingRequests.length}</Badge>
                    </CardTitle>
                    <CardDescription>Review and approve new member requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {group.pendingRequests.map((request) => (
                        <Card key={request.id} className="border-orange-200 bg-orange-50">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3">
                                <Avatar>
                                  <AvatarImage src={request.image || "/placeholder.svg"} alt={request.name} />
                                  <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium">{request.name}</h3>
                                    <Badge variant="outline" className="text-xs">
                                      <Clock className="mr-1 h-3 w-3" />
                                      {request.requestDate}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {request.email} • {request.vehicle} • {request.seats} seats
                                  </p>
                                  <p className="text-sm bg-white p-2 rounded border">"{request.message}"</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => approveMember(request.id)}
                                  className="bg-emerald-600 hover:bg-emerald-700"
                                >
                                  Approve
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => rejectMember(request.id)}>
                                  Decline
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Group Members
                      </CardTitle>
                      <CardDescription>{group.members.length} members in this carpool group</CardDescription>
                    </div>
                    {isAdmin() && (
                      <Button onClick={() => setShowJoinCodeDialog(true)} variant="outline">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Invite Members
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {group.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{member.name}</h3>
                              {member.role === "admin" && (
                                <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                                  <Shield className="mr-1 h-3 w-3" />
                                  Admin
                                </Badge>
                              )}
                              {member.isCreator && (
                                <Badge variant="outline" className="text-blue-600 border-blue-600">
                                  <Crown className="mr-1 h-3 w-3" />
                                  Creator
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {member.vehicle} • {member.seats} seats • Joined {member.joinedDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            Message
                          </Button>
                          {isAdmin() && member.id !== currentUserId && (
                            <>
                              <Button variant="outline" size="sm" onClick={() => toggleMemberRole(member.id)}>
                                {member.role === "admin" ? "Remove Admin" : "Make Admin"}
                              </Button>
                              {!member.isCreator && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedMember(member)
                                    setShowRemoveMemberDialog(true)
                                  }}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <UserMinus className="h-4 w-4" />
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="discussions" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Group Discussions</CardTitle>
                <CardDescription>Communicate with other parents in the group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group.discussions.map((discussion) => (
                    <Card key={discussion.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{discussion.author}</div>
                            <div className="text-xs text-gray-500">{discussion.date}</div>
                          </div>
                        </div>
                        <p className="text-sm mb-3">{discussion.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">{discussion.replies} replies</div>
                          <Button variant="ghost" size="sm">
                            Reply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {isAdmin() && (
            <TabsContent value="admin" className="pt-4">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Admin Controls
                    </CardTitle>
                    <CardDescription>Manage group settings and member access</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Group Join Code</h3>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-mono text-2xl font-bold tracking-wider text-emerald-600">{joinCode}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            Share this code with parents who want to join the group
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={copyJoinCode}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </Button>
                          <Button variant="outline" size="sm" onClick={generateNewJoinCode}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            New Code
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Generating a new code won't affect existing members, but will invalidate the old code for new
                        joiners.
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Member Statistics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{group.members.length}</div>
                          <div className="text-sm text-blue-600">Total Members</div>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-lg">
                          <div className="text-2xl font-bold text-emerald-600">
                            {group.members.filter((m) => m.role === "admin").length}
                          </div>
                          <div className="text-sm text-emerald-600">Admins</div>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{group.pendingRequests.length}</div>
                          <div className="text-sm text-orange-600">Pending Requests</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          <TabsContent value="settings" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Group Settings</CardTitle>
                <CardDescription>Manage group preferences and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Group Information</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Group Name</label>
                        <Input defaultValue={group.name} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <Textarea defaultValue={group.description} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Privacy Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Group Visibility</label>
                          <p className="text-xs text-gray-500">Who can see this group</p>
                        </div>
                        <Select defaultValue="members">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="members">Members Only</SelectItem>
                            <SelectItem value="invite">Invite Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Join Requests</label>
                          <p className="text-xs text-gray-500">How new members can join</p>
                        </div>
                        <Select defaultValue="approval">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select join method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Anyone can join</SelectItem>
                            <SelectItem value="approval">Require approval</SelectItem>
                            <SelectItem value="invite">Invite only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Join Code Dialog */}
      <Dialog open={showJoinCodeDialog} onOpenChange={setShowJoinCodeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite New Members</DialogTitle>
            <DialogDescription>
              Share this join code with parents who want to join your carpool group.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="font-mono text-3xl font-bold tracking-wider text-emerald-600 mb-2">{joinCode}</div>
              <div className="text-sm text-gray-500">New members can use this code to request to join</div>
            </div>
            <div className="space-y-2">
              <Label>Share Instructions</Label>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded text-sm">
                "Hi! I'd like to invite you to join our '{group.name}' carpool group on ZooSchool. Use join code:{" "}
                <strong>{joinCode}</strong> when you sign up!"
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={generateNewJoinCode} className="w-full sm:w-auto bg-transparent">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Code
            </Button>
            <Button onClick={copyJoinCode} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
              <Copy className="mr-2 h-4 w-4" />
              Copy Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Member Dialog */}
      <Dialog open={showRemoveMemberDialog} onOpenChange={setShowRemoveMemberDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {selectedMember?.name} from the group? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRemoveMemberDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => selectedMember && removeMember(selectedMember.id)}>
              Remove Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
