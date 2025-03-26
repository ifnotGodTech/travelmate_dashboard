"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "../dashboard-layout"
import { DatePicker } from "../components/date-picker"
import { BookingCalendar } from "../components/booking-calendar"
import { BookingFilter } from "../components/booking-filter"
import { Search } from "lucide-react"
import type { BookingItem } from "../types"

// Mock data
const mockBookings: BookingItem[] = [
  {
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
  {
    id: "2",
    userName: "Kemi Adeoti",
    timeRange: "12:00 - 12:45",
    day: "Monday",
    time: "12:00",
    type: "Car",
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
  {
    id: "3",
    userName: "Kemi Adeoti",
    timeRange: "12:00 - 12:45",
    day: "Thursday",
    time: "12:00",
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
  {
    id: "4",
    userName: "Kemi Adeoti",
    timeRange: "12:00 - 12:45",
    day: "Tuesday",
    time: "16:00",
    type: "Double",
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
  {
    id: "5",
    userName: "Kemi Adeoti",
    timeRange: "12:00 - 12:45",
    day: "Saturday",
    time: "14:00",
    type: "Double",
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
  {
    id: "6",
    userName: "Kemi Adeoti",
    timeRange: "12:00 - 12:45",
    day: "Sunday",
    time: "08:00",
    type: "Hotel",
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
  {
    id: "7",
    userName: "Kemi Adeoti",
    timeRange: "12:00 - 12:45",
    day: "Sunday",
    time: "20:00",
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
  {
    id: "8",
    userName: "Kemi Adeoti",
    timeRange: "12:00 - 12:45",
    day: "Tuesday",
    time: "21:00",
    type: "Hotel",
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
  {
    id: "9",
    userName: "Kemi Adeoti",
    timeRange: "12:00 - 12:45",
    day: "Saturday",
    time: "24:00",
    type: "Hotel",
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
]

export default function BookingsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState("Thursday 13th of Feb., 2025")
  const [activeFilter, setActiveFilter] = useState("All")
  const [bookingsPerPage, setBookingsPerPage] = useState("20")

  const filteredBookings = mockBookings.filter((booking) => {
    if (activeFilter !== "All" && booking.type !== activeFilter) {
      return false
    }

    if (searchQuery && !booking.userName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  const handleBookingClick = (booking: BookingItem) => {
    router.push(`/bookings/${booking.id}`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Bookings</h1>

        {/* <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-2/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by user's name"
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DatePicker value={selectedDate} onChange={setSelectedDate} />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Today's bookings</span>
            <select
              value={bookingsPerPage}
              onChange={(e) => setBookingsPerPage(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <BookingFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        <BookingCalendar bookings={filteredBookings} onBookingClick={handleBookingClick} /> */}
      </div>
    </DashboardLayout>
  )
}

