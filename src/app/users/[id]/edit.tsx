"use client"

import { useState } from "react"
import Layout from "../../../components/layout"
import { useRouter } from "next/router"
import Image from "next/image"
import { Calendar } from "lucide-react"
import type { BookingItem } from "../../../types"

// Mock data - in a real app, you would fetch this based on the ID
const mockBookings: Record<string, BookingItem> = {
  "1": {
    id: "1",
    userName: "Kemi Adeoti",
    timeRange: "12:00 - 12:45",
    day: "Monday",
    time: "00:00",
    type: "Flight",
    details: {
      firstName: "Kemi",
      lastName: "Adeoti",
      address: "12 Aliu Olaiya Avenue, Ikeja, Lagos State.",
      phone: "+234 8012 3456 789",
      email: "kemiadeoti@gmail.com",
      flight: {
        airline: "Air Peace Limited",
        departure: "Lagos (LOS)",
        arrival: "Abuja (ABV)",
        departureTime: "2:00pm",
        arrivalTime: "4:00pm",
        class: "Economy",
        ticketNumber: "1111",
        date: "Feb 9,2025",
        flightNumber: "P4 7120",
        duration: "2 Hrs",
        aircraft: "B737-700",
        price: {
          base: "₦50,000",
          taxes: "₦10,000",
          total: "₦110,000",
        },
      },
    },
  },
}

export default function UserEditPage() {
  const router = useRouter()
  const { id } = router.query

  // In a real app, you would fetch the booking data based on the ID
  const booking = mockBookings[id as string]

  const [flightTime, setFlightTime] = useState("2:00")
  const [flightTimeAmPm, setFlightTimeAmPm] = useState("AM")
  const [flightDate, setFlightDate] = useState("Thursday 13th of Feb., 2025")

  if (!booking) {
    return (
      <Layout title="User Management" showBackButton>
        <div className="flex items-center justify-center h-full">
          <p>User not found</p>
        </div>
      </Layout>
    )
  }

  const handleConfirmUpdate = () => {
    // In a real app, you would update the booking data
    router.push(`/bookings/${id}`)
  }

  return (
    <Layout title="User Management" showBackButton>
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-gray-700">Thursday 13th of Feb., 2025 | 08:43AM</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Traveler</h2>
          <div className="flex items-start gap-6">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image src="/placeholder-user.jpg" alt="User avatar" fill className="object-cover" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 flex-1">
              <div>
                <p className="text-sm text-gray-500">First Name</p>
                <p>{booking.details.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Name</p>
                <p>{booking.details.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Residential Address</p>
                <p>{booking.details.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p>{booking.details.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p>{booking.details.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Travel Information</h2>
          <div className="mb-6">
            <h3 className="font-medium mb-4">Departure Details</h3>
            <p className="mb-4">{booking.details.flight.airline}</p>

            <div className="mb-6">
              <label className="block mb-2 text-sm text-gray-500">Flight Time</label>
              <div className="flex gap-4">
                <div className="relative">
                  <select
                    value={flightTime}
                    onChange={(e) => setFlightTime(e.target.value)}
                    className="appearance-none border border-gray-300 rounded-md px-3 py-2 pr-8 w-24"
                  >
                    <option value="1:00">1:00</option>
                    <option value="2:00">2:00</option>
                    <option value="3:00">3:00</option>
                    <option value="4:00">4:00</option>
                    <option value="5:00">5:00</option>
                    <option value="6:00">6:00</option>
                    <option value="7:00">7:00</option>
                    <option value="8:00">8:00</option>
                    <option value="9:00">9:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select
                    value={flightTimeAmPm}
                    onChange={(e) => setFlightTimeAmPm(e.target.value)}
                    className="appearance-none border border-gray-300 rounded-md px-3 py-2 pr-8 w-24"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm text-gray-500">Flight Date</label>
              <div className="relative">
                <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                  <span className="flex-1">{flightDate}</span>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-full py-3 bg-blue-700 text-white font-medium rounded-lg mt-8"
            onClick={handleConfirmUpdate}
          >
            CONFIRM UPDATE
          </button>
        </div>
      </div>
    </Layout>
  )
}

