"use client"

import React from "react"
import type { BookingItem } from "../types"

interface BookingCalendarProps {
  bookings: BookingItem[]
  onBookingClick: (booking: BookingItem) => void
}

export function BookingCalendar({ bookings, onBookingClick }: BookingCalendarProps) {
  const timeSlots = ["00:00", "08:00", "12:00", "14:00", "16:00", "20:00", "21:00", "24:00"]

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  // Group bookings by day and time
  const bookingsByDayAndTime = bookings.reduce(
    (acc, booking) => {
      const day = booking.day
      const time = booking.time

      if (!acc[day]) {
        acc[day] = {}
      }

      if (!acc[day][time]) {
        acc[day][time] = []
      }

      acc[day][time].push(booking)

      return acc
    },
    {} as Record<string, Record<string, BookingItem[]>>,
  )

  const getBookingColor = (type: string) => {
    switch (type) {
      case "Flight":
        return "bg-orange-500"
      case "Hotel":
        return "bg-green-500"
      case "Car":
        return "bg-blue-800"
      case "Double":
        return "bg-amber-800" // Using amber as a substitute for brown
      default:
        return "bg-yellow-500"
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-[100px_repeat(7,1fr)] bg-white rounded-lg">
          <div className="p-4 font-medium">Time</div>
          {days.map((day) => (
            <div key={day} className="p-4 font-medium text-center">
              {day}
            </div>
          ))}

          {timeSlots.map((time) => (
            <React.Fragment key={time}>
              <div className="p-4 border-t border-gray-100">{time}</div>
              {days.map((day) => {
                const dayBookings = bookingsByDayAndTime[day]?.[time] || []
                return (
                  <div key={`${day}-${time}`} className="p-2 border-t border-gray-100">
                    {dayBookings.map((booking) => (
                      <div
                        key={booking.id}
                        onClick={() => onBookingClick(booking)}
                        className={`${getBookingColor(booking.type)} text-white p-2 rounded cursor-pointer`}
                      >
                        <div className="font-medium">{booking.userName}</div>
                        <div className="text-xs">{booking.timeRange}</div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

