"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Car, Plus, Search, Users } from "lucide-react"

export default function GroupsPage() {
  const [myGroups, setMyGroups] = useState([
    {
      id: 1,
      name: "Zoo School NE",
      description: "Parents on the northeast side driving to Zoo School",
      members: 8,
      image: "/minimal-school-building.png",
      nextTrip: "Mon, Aug 6 at 7:30 AM",
    },
    {
      id: 2,
      name: "Soccer Practice",
      description: "Weekend soccer practice carpooling",
      members: 6,
      image: "/minimal-soccer-field.png",
      nextTrip: "Sat, Aug 11 at 9:00 AM",
    },
    {
      id: 3,
      name: "Piano Lessons",
      description: "Tuesday afternoon piano lessons at Music Center",
      members: 4,
      image: "/minimal-piano-keys.png",
      nextTrip: "Tue, Aug 7 at 4:00 PM",
    },
  ])

  const [discoverGroups, setDiscoverGroups] = useState([
    {
      id: 4,
      name: "Westside Elementary",
      description: "Carpool group for Westside Elementary School",
      members: 12,
      image: "/minimal-elementary-school.png",
      distance: "2.3 miles away",
    },
    {
      id: 5,
      name: "Swim Team",
      description: "Morning and afternoon swim practice carpooling",
      members: 9,
      image: "/minimal-swimming-pool.png",
      distance: "3.5 miles away",
    },
    {
      id: 6,
      name: "Art Class",
      description: "Wednesday art class at Community Center",
      members: 5,
      image: "/minimal-art-supplies.png",
      distance: "1.8 miles away",
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
          <h1 className="text-3xl font-bold">Groups</h1>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" /> Create Group
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input placeholder="Search for groups by name, school, or activity..." className="pl-10" />
        </div>

        <Tabs defaultValue="my-groups" className="mb-6">
          <TabsList>
            <TabsTrigger value="my-groups">My Groups</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>
          <TabsContent value="my-groups" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={group.image || "/placeholder.svg"} alt={group.name} />
                        <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{group.name}</CardTitle>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="mr-1 h-3 w-3" />
                          {group.members} members
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{group.description}</p>
                    <div className="mt-4">
                      <div className="text-sm font-medium">Next scheduled trip:</div>
                      <div className="text-sm">{group.nextTrip}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Schedule
                    </Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                      <Link href={`/groups/${group.id}`}>View Group</Link>
                    </Button>
                  </CardFooter>
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
          <TabsContent value="discover" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {discoverGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={group.image || "/placeholder.svg"} alt={group.name} />
                        <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{group.name}</CardTitle>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="mr-1 h-3 w-3" />
                          {group.members} members
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{group.description}</p>
                    <div className="mt-4">
                      <Badge variant="outline">{group.distance}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Join Group
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
