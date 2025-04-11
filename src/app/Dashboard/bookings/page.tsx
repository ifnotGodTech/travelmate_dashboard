"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker } from "@/app/components/date-picker";
import { BookingCalendar } from "@/app/components/booking-calendar";
import { BookingFilter } from "@/app/components/booking-filter";
import { Search } from "lucide-react";
import { mockBookings } from "@/components/data";
import { BookingItem } from "@/app/types";

export default function BookingsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    "Thursday 13th of Feb., 2025"
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [bookingsPerPage, setBookingsPerPage] = useState("20");

  const filteredBookings = mockBookings.filter((booking) => {
    if (activeFilter !== "All" && booking.type !== activeFilter) {
      return false;
    }

    if (
      searchQuery &&
      !booking.userName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleBookingClick = (booking: BookingItem) => {
    router.push(`/bookings/${booking.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
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
        <BookingFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <BookingCalendar
        bookings={filteredBookings}
        onBookingClick={handleBookingClick}
      />
    </div>
  );
}
