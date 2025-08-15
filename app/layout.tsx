import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZooSchool Carpool",
  description: "Safe and organized carpooling for school activities",
    generator: 'v0.app'
}
// Example: app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="p-6 bg-gray-100 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">
            Zoo School Carpool
            <span className="block text-base mt-1 font-normal text-gray-600">
              a VanKlompInnovation
            </span>
          </h1>
        </header>
        {children}
      </body>
    </html>
  );
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
