"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Pencil, X } from "lucide-react"
import DashboardLayout from "../../dashboard-layout"
import type { BookingItem } from "../../types"

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

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [cancellationReason, setCancellationReason] = useState("")

  // In a real app, you would fetch the booking data based on the ID
  const booking = mockBookings[id]

  if (!booking) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p>Booking not found</p>
        </div>
      </DashboardLayout>
    )
  }

  const handleCancelBooking = () => {
    setShowCancelModal(true)
  }

  const handleConfirmCancellation = () => {
    setShowCancelModal(false)
    setShowSuccessModal(true)
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    router.push("/bookings")
  }

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center gap-4">
        <button onClick={() => router.back()} className="p-1 rounded-full hover:bg-gray-200">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold">Bookings</h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-gray-700">Thursday 13th of Feb., 2025 | 08:43AM</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Traveler</h2>
          <div className="flex items-start gap-6">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image
                src="/placeholder-user.jpg"
                alt="User avatar"
                width={64}
                height={64}
                className="object-cover rounded-full"
              />
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
          <div className="mb-4">
            <h3 className="font-medium mb-2">Departure Flight Details</h3>
            <p className="text-sm text-gray-700">{booking.details.flight.airline}</p>

            <div className="flex items-center gap-4 my-4">
              <div>
                <p className="font-medium">{booking.details.flight.departureTime}</p>
                <p className="text-sm text-gray-500">{booking.details.flight.departure}</p>
              </div>
              <div className="flex-1 flex items-center">
                <div className="h-0.5 w-full bg-gray-300 relative">
                  <div className="absolute top-1/2 left-0 w-2 h-2 bg-gray-700 rounded-full -translate-y-1/2"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-gray-700 rounded-full -translate-y-1/2"></div>
                </div>
              </div>
              <div>
                <p className="font-medium">{booking.details.flight.arrivalTime}</p>
                <p className="text-sm text-gray-500">{booking.details.flight.arrival}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <div>
                <p className="text-sm text-gray-500">Class</p>
                <p>{booking.details.flight.class}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">E- Ticket Number</p>
                <p>{booking.details.flight.ticketNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p>{booking.details.flight.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Flight Number</p>
                <p>{booking.details.flight.flightNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p>{booking.details.flight.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Aircraft Type</p>
                <p>{booking.details.flight.aircraft}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Price Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Departure Flight</p>
                <p>{booking.details.flight.price.base}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Taxes(15%)</p>
                <p>{booking.details.flight.price.taxes}</p>
              </div>
              <div className="flex justify-between font-medium">
                <p>Total</p>
                <p>{booking.details.flight.price.total}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-md"
              onClick={() => router.push(`/Dashboard/booking/${booking.id}/edit`)}
            >
              <Pencil className="h-4 w-4" />
              UPDATE TRAVEL INFORMATION
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-md"
              onClick={handleCancelBooking}
            >
              <X className="h-4 w-4" />
              PROCESS CANCELLATION
            </button>
          </div>
        </div>
      </div>

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Cancel user's booking?</h2>
            <p className="text-gray-500 mb-6">
              Once you confirm cancellation, a confirmation message will be sent to the user about the status of their
              booking.
            </p>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Reason for cancellation (Optional)</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Write here"
                rows={4}
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button
                className="flex-1 py-3 bg-blue-700 text-white font-medium rounded-lg"
                onClick={handleConfirmCancellation}
              >
                PROCEED
              </button>
              <button
                className="flex-1 py-3 border border-gray-300 rounded-lg"
                onClick={() => setShowCancelModal(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
            <button className="absolute top-4 right-4" onClick={handleCloseSuccessModal}>
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-semibold mb-6">Cancellation Successful</h2>

            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <p className="text-gray-700 mb-6">User's booking successfully cancelled.</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

