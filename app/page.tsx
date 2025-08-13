import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Car, Clock, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">ZooSchool</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/groups" className="text-sm font-medium hover:underline">
              Groups
            </Link>
            <Link href="/schedule" className="text-sm font-medium hover:underline">
              Schedule
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:underline">
              Profile
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Simplify School Carpooling for Parents
                  </h1>
                  <p className="text-sm text-emerald-600 font-medium">
                    ZooSchool, brought to you by VanKlompInnovations Internationale
                  </p>
                </div>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ZooSchool makes it easy to organize carpools with other parents. Schedule rides, manage availability,
                  and coordinate with your community to get kids where they need to go.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                      Get Started
                    </Button>
                  </Link>
                  <a href="#how-it-works">
                    <Button size="lg" variant="outline">
                      How It Works
                    </Button>
                  </a>
                </div>
              </div>
              <img
                src="/modern-carpool-hero.png"
                alt="Modern carpool illustration"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                width={600}
                height={400}
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How ZooSchool Works</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes carpooling simple and efficient for busy parents.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Create Groups</h3>
                <p className="text-gray-500">
                  Form carpooling groups with other parents from your school, neighborhood, or activities.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Calendar className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Set Availability</h3>
                <p className="text-gray-500">Mark your available driving days, blackout dates, and vehicle capacity.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Clock className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Schedule Trips</h3>
                <p className="text-gray-500">
                  Organize morning and afternoon rides with automatic reminders for drivers and parents.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-emerald-600" />
                <span className="text-lg font-semibold">ZooSchool</span>
              </div>
              <p className="text-xs text-gray-400">by VanKlompInnovations Internationale</p>
            </div>
            <p className="text-sm text-gray-500">© 2025 VanKlompInnovations Internationale. All rights reserved.</p>
            <nav className="flex gap-4">
              <Link href="/terms" className="text-sm text-gray-500 hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:underline">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
