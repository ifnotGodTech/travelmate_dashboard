"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "./dashboard-layout"

export default function HomePage() {
  const router = useRouter()

  // Redirect to bookings page
  useEffect(() => {
    router.push("/bookings")
  }, [router])

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-full">
        <p>Redirecting to bookings...</p>
      </div>
    </DashboardLayout>
  )
}

