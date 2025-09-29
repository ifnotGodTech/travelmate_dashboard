"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetBooking } from "@/hooks/api/bookings";

import StayDetails from "@/components/molecues/bookings/data/stays/StaysDetails";
import CarDetails from "@/components/molecues/bookings/data/cars/CarDetails";
import FlightDetails from "@/components/molecues/bookings/data/flight/FlightDetails";

export default function BookingDetailsPage() {
  const { id }: { id: string } = useParams();
  const router = useRouter();

  const { booking, loadingBooking } = useGetBooking({
    bookingRef: id,
    initalFetch: true,
    successCallback: () => {},
  });

  const bookingComponents: Record<string, React.ReactNode> = {
    stays: <StayDetails />,
    transfers: <CarDetails data={booking?.result} />,
    flights: <FlightDetails data={booking?.result} />,
  };

  const currentType = booking?.booking_type?.toLowerCase() ?? "";

  if (loadingBooking || !booking) {
    return (
      <div className="space-y-[24px]">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <img
              src="/assets/icons/arrow-back.svg"
              alt="Go back"
              className="cursor-pointer"
              onClick={() => router.back()}
            />
            <h1 className="text-[28px] font-semibold text-[#181818]">
              Booking Details
            </h1>
          </div>
        </div>

        <div className="text-center py-6 text-gray-500">
          Loading booking details...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-[24px]">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <img
            src="/assets/icons/arrow-back.svg"
            alt="Go back"
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <h1 className="text-[28px] font-semibold text-[#181818]">
            Booking Details
          </h1>
        </div>

        <button
          className="rounded-[8px] p-[12px] bg-[#D72638] text-[#fff] text-[14px] font-[400] cursor-pointer"
          onClick={() => console.log("Cancel booking clicked")}
        >
          Cancel Booking
        </button>
      </div>

      {bookingComponents[currentType] || (
        <div className="text-center py-6 text-gray-400">
          No details available for this booking type.
        </div>
      )}
    </div>
  );
}
