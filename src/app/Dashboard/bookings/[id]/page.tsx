"use client";

import { useParams, useRouter } from "next/navigation";

import StayDetails from "@/components/molecues/bookings/data/stays/StaysDetails";
import CarDetails from "@/components/molecues/bookings/data/cars/CarDetails";
import FlightDetails from "@/components/molecues/bookings/data/flight/FlightDetails";

export default function BookingDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const dataType = "cars";

  return (
    <div className="space-y-[24px]">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <img
            src="/assets/icons/arrow-back.svg"
            alt=""
            className=" cursor-pointer "
            onClick={() => router.back()}
          />
          <h1 className="text-[28px] font-semibold text-[#181818]">
            Booking Details
          </h1>
        </div>
        <div className="rounded-[8px] p-[12px] bg-[#D72638] text-[#fff] text-[14px] font-[400] cursor-pointer ">
          Cancel Booking
        </div>
      </div>

      {dataType === "stays" ? (
        <StayDetails />
      ) : dataType === "cars" ? (
        <CarDetails />
      ) : dataType === "flight" ? (
        <FlightDetails />
      ) : null}
    </div>
  );
}
