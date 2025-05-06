"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      </div>
      <Ticket />
    </div>
  );
};

const Ticket = () => {
  return (
    <div className="lg:space-y-10 space-y-6 rounded-[20px] p-[20px] lg:p-[40px] bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-[16px] lg:text-[18px] font-[600] lg:font-[500] leading-[100%] text-[#181818] ">
          Booking Details
        </h1>

        <div className="flex space-x-8 items-center">
          <p className="text-[12px] lg:text-[16px] font-[500] leading-[100%] text-[#023E8A] ">
            Download
          </p>
          <span className="">
            <img
              src="/assets/icons/download-2.svg"
              alt=""
              className="w-[16px] lg:w-[24px] "
            />
          </span>
        </div>
      </div>

      <div className="space-y-4 lg:space-y-6">
        <div className="w-full h-[62px] bg-[#023E8A] flex items-center ">
          <div className="flex space-x-2 items-center ml-[30.5px] ">
            <img src="/assets/icons/white-airplane.svg" alt="" className="" />
            <span className="">
              <p className="text-[20px] font-[500] text-[#FFFFFF] ">
                TravelMate
              </p>
            </span>
          </div>
        </div>

        <div className="px-[16px] lg:px-10 space-y-6 ">
          <div className="lg:w-[738px] grid lg:grid-cols-2 space-y-6 grid-col-1 ">
            <div className="grid grid-cols-2  space-x-6 w-[1/2]">
              <div className="">
                <p className="font-[400] text-[14px] leading-[100%] tracking-[0%] text-[#181818] ">
                  Name:
                </p>
              </div>
              <div className="">
                <p className=" font-[500] text-[16px] leading-[100%] tracking-[0%] text-[#181818] ">
                  Kemi Adeoti
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2  space-x-6 w-[1/2]">
              <div className="">
                <p className="font-[400] text-[14px] leading-[100%] tracking-[0%] text-[#181818] ">
                  Departure Date:
                </p>
              </div>
              <div className="">
                <p className=" font-[500] text-[16px] leading-[100%] tracking-[0%] text-[#181818] ">
                  March 1, 2025
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2  space-x-6 w-[1/2]">
              <div className="">
                <p className="font-[400] text-[14px] leading-[100%] tracking-[0%] text-[#181818] ">
                  Destination:
                </p>
              </div>
              <div className="">
                <p className=" font-[500] text-[16px] leading-[100%] tracking-[0%] text-[#181818] ">
                  Johannesburg, SA.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2  space-x-6 w-[1/2]">
              <div className="">
                <p className="font-[400] text-[14px] leading-[100%] tracking-[0%] text-[#181818] ">
                  Return Date:
                </p>
              </div>
              <div className="">
                <p className=" font-[500] text-[16px] leading-[100%] tracking-[0%] text-[#181818] ">
                  March 4, 2025
                </p>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-dashed border-[#023E8A] my-4"></div>

          <div className="  lg:p-[40px] grid grid-cols-1 lg:grid-cols-3 space-x-0 lg:space-x-8 w-full space-y-[24px]  lg:space-y-0 ">
            <Flight title="Flight Details" />
            <Flight title="Hotel Details" />
            <Flight title="Car Details" />
          </div>

          <div className="w-full h-[22px] bg-[#023E8A]"></div>
        </div>
      </div>
    </div>
  );
};

const Flight = ({ title }: any) => {
  return (
    <div className="space-y-8">
      <h1 className="text-[16px] font-[600] text-[#181818] leading-[100%] ">
        {title}
      </h1>

      <div className="space-y-6 w-full">
        <div className="grid grid-cols-2 space-x-6 w-full ">
          <p className="font-[400] text-[14px] leading-[100%] tracking-[0%] text-[#181818] ">
            Flight No:
          </p>
          <p className=" font-[500] text-[16px] leading-[100%] tracking-[0%] text-[#181818] ">
            #826
          </p>
        </div>
        <div className="grid grid-cols-2 space-x-6">
          <p className="font-[400] text-[14px] leading-[100%] tracking-[0%] text-[#181818] ">
            Seat No:
          </p>
          <p className=" font-[500] text-[16px] leading-[100%] tracking-[0%] text-[#181818] ">
            18A
          </p>
        </div>
        <div className="grid grid-cols-2 space-x-6">
          <p className="font-[400] text-[14px] leading-[100%] tracking-[0%] text-[#181818] ">
            Class:
          </p>
          <p className=" font-[500] text-[16px] leading-[100%] tracking-[0%] text-[#181818] ">
            Economy
          </p>
        </div>
        <div className="grid grid-cols-2 space-x-6">
          <p className="font-[400] text-[14px] leading-[100%] tracking-[0%] text-[#181818] ">
            Gate:
          </p>
          <p className=" font-[500] text-[16px] leading-[100%] tracking-[0%] text-[#181818] ">
            4C
          </p>
        </div>
        <div className="grid grid-cols-2 space-x-6">
          <p className="font-[400] text-[14px] leading-[100%] tracking-[0%] text-[#181818] ">
            Check In:
          </p>
          <p className=" font-[500] text-[16px] leading-[100%] tracking-[0%] text-[#181818] ">
            11:30AM
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
