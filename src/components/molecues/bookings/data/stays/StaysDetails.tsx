"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Grid } from "lucide-react";
import { GridValues, FlexValues, Policy } from "../../reuseables";

export default function StayDetails() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  return (
    <div className="space-y-[24px]">
      <BookingDetails />
      <GridDetails />
    </div>
  );
}

const BookingDetails = () => {
  return (
    <div className="space-y-[24px]">
      <div className="bg-[#fff] p-[24px] space-y-[20px] rounded-[12px] w-full ">
        <h1 className="font-[600] text-[20px] text-[#181818] ">
          Confirmation Details
        </h1>

        <div className="flex justify-between items-center">
          <GridValues title="Confirmation Number" value="123456789" />
          <GridValues title="Pin Code" value="1111" />
          <GridValues title="Booked On" value="25/05/2025" />
          <GridValues title="Check In" value="25/05/2025" />
          <GridValues title="Check Out" value="30/05/2025" />

          <div className="flex flex-col items-start space-y-3">
            <h1 className="text-[16px] font-[500] text-[#4E4F52] whitespace-nowrap">
              Payment Status{" "}
            </h1>
            <div className="border-[1px] border-[#2D9C5E] rounded-[12px] text-[#2D9C5E] text-[14px] font-[400] bg-[#2D9C5E1A] px-[20px] py-[10px] whitespace-nowrap flex-shrink-0">
              Paid
            </div>
          </div>
          <div className="flex flex-col items-start space-y-3">
            <h1 className="text-[16px] font-[500] text-[#4E4F52] whitespace-nowrap">
              Booking Status
            </h1>
            <div className="border-[1px] border-[#2D9C5E] rounded-[12px] text-[#2D9C5E] text-[14px] font-[400] bg-[#2D9C5E1A] px-[20px] py-[10px] whitespace-nowrap flex-shrink-0">
              Confirmed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GridDetails = () => {
  const List = [
    "Cancellation period: Until May 24, 2025 11:59 PM",
    "Full Refund: Until May 24, 2025 11:59 PM",
    "Partial Refund (50%): May 28, 2025 11:59 PM",
    "No Refund: After May 29, 2025",
  ];
  return (
    <div className="grid grid-cols-2 gap-[24px]">
      <div className="space-y-6">
        <div className="bg-[#fff] space-y-[22px] p-[24px] rounded-[12px]">
          <div className="space-y-4">
            <h1 className="text-[20px] font-[600] text-[#181818]">
              Guest Details
            </h1>
            <div className="space-y-4">
              <FlexValues title="Name" value="John Doe" />
              <FlexValues title="Date Of Birth" value="01/01/1990" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-[20px] font-[600] text-[#181818]">
              Contact Information
            </h1>
            <div className="space-y-4">
              <FlexValues title="Email Address" value="Johndoe@gmail.com" />
              <FlexValues title="Phone Number" value="09012345678" />
            </div>
          </div>
        </div>
        <div className="bg-[#fff] space-y-[22px] p-[24px] rounded-[12px]">
          <div className="space-y-4">
            <h1 className="text-[20px] font-[600] text-[#181818]">
              Stay Details
            </h1>
            <div className="space-y-4">
              <FlexValues title="Type" value="Hotel" />
              <FlexValues
                title="Property Name"
                value="Maison Fahrenheit Hotel"
              />
              <FlexValues title="Room Type" value="Standard King Room" />
              <FlexValues
                title="Location"
                value="80 Adetokunbo Ademola Street, Victoria Island, Lagos."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[#fff] space-y-[22px] p-[24px] rounded-[12px]">
          <div className="space-y-4">
            <h1 className="text-[20px] font-[600] text-[#181818]">
              Transaction Details
            </h1>
            <div className="space-y-4">
              <FlexValues title="Payment Method" value="Paypal" />
              <FlexValues title="Transaction ID" value="TXN789456123" />
            </div>
          </div>
        </div>
        <Transaction />
        <Policy List={List} />
      </div>
    </div>
  );
};

export const Transaction = () => {
  return (
    <div className="bg-[#fff] p-[24px] rounded-[12px]">
      <h1 className="text-[20px] font-[600] text-[#181818] mb-[16px]">
        Payment Details
      </h1>
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="space-y-3">
            <h1 className="text-[16px] font-[500] text-[#4E4F52]">
              Standard King Room
            </h1>
            <div className="flex space-x-1 items-center ">
              <span className="">1 room</span>
              <span className=" w-[6px] h-[6px] bg-[#4E4F52] rounded-full"></span>
              <span className="">7 Nights</span>
            </div>
          </div>

          <p className="">₦70,000</p>
        </div>
        <FlexValues title="Taxes(15%)" value="₦10,000" />
        <div className="borde-[1px] border-[#ACAEB3] border-b "></div>
        <FlexValues title="Total" value="₦80,000" />
      </div>
    </div>
  );
};
