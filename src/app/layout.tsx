import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TravelMate - Booking Management",
  description: "Manage travel bookings efficiently",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`antialiased lg:bg-[#f5f5f5] `}>
        {children}
      </body>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

