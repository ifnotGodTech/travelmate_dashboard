"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  return (
    <div className="space-y-[24px]">
      <div className="">
        <img
          src="/assets/icons/arrow-back.svg"
          alt=""
          className="cursor-pointer"
          onClick={() => router.back()}
        />
      </div>

      <NotificationTable />
    </div>
  );
};

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const NotificationTable = () => {
  const [filterDropdown, setFilterDropdown] = useState(false);
  const toggleDropdown = () => setFilterDropdown((prev) => !prev);

  return (
    <>
      <div className="border-[1px] border-[#9B9EA4] rounded-[12px] overflow-hidden ">
        {/* Header Section */}
        <div className="flex items-center justify-between border-b py-[20px] px-[24px] bg-[#fff] ">
          <div className="flex space-x-2 items-center ">
            <input type="checkbox" className="form-checkbox h-5 w-5" />
            <button className="flex items-center space-x-2 p-[10px] border-[1px] border-[#EBECED] rounded-[28px] text-sm font-medium text-[#181818] cursor-pointer ">
              <img src="/assets/icons/Refresh.svg" alt="" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex border-[#ACAEB3] border-[1px] rounded-[1000px] w-[306px] py-[10px] px-6 space-x-4">
              <img src="/assets/icons/search.svg" alt="" className="" />
              <input
                type="text"
                placeholder="Search Notifications"
                className="text-sm w-full outline-none"
              />
            </div>
            <div className="flex border-[#ACAEB3] border-[1px] rounded-[1000px] py-[10px] px-6 space-x-4 cursor-pointer ">
              <img src="/assets/icons/calendar.svg" alt="" className="" />
              <span className="">
                <span>Filter by Date</span>
              </span>
            </div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex border-[#ACAEB3] border-[1px] rounded-[1000px] py-[10px] px-6 space-x-4 cursor-pointer items-center "
              >
                <span>All Notifications</span>
                {filterDropdown ? (
                  <ChevronUp className="ml-2 w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-2 w-4 h-4" />
                )}
              </button>
              {filterDropdown && (
                <div className="absolute top-10 right-0 w-40 bg-white border rounded-lg shadow-md z-10">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    All
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Read
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Unread
                  </button>
                </div>
              )}
            </div>
            <button className="px-4 py-2 text-[#023E8A] rounded-lg border-[#023E8A] border-[1px] cursor-pointer ">
              Apply
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-start justify-between w-full px-[32px] bg-[#CCD8E833] py-3 "
            >
              <div className="flex items-start space-x-4">
                <input type="checkbox" className="form-checkbox h-5 w-5" />
                <div className="space-y-2 flex-1 w-full">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-[18px] font-[500] text-[#181818]">
                      Refund Request - Stays
                    </p>
                    {/* <span className="bg-[#023E8A] h-[16px] w-[16px] rounded-full"></span>{" "} */}
                    {/* <span className="rounded-[4px] p-[10px] bg-[#fff] text-[#181818] text-[12px] font-[500]">
                    Mark As Read
                  </span> */}
                  </div>
                  <p className="text-[16px] text-[#4E4F52] font-[400] ">
                    Ticket TK2025-001 has been escalated by Elvis from Customer
                    Support. Click to view and resolve.
                  </p>
                  <p className="text-xs font-[400] text-[#181818]">
                    6/3/2025 • 2 Minutes Ago
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-5">
        <div className="border-[#9B9EA4] border-[1px] rounded-[8px] p-[12px] text-[14px] font-[400] text-[#9B9EA4] ">
          Previous
        </div>
        <div className="border-[#9B9EA4] border-[1px] rounded-[8px] p-[12px] text-[14px] font-[400] text-[#9B9EA4] ">
          Next
        </div>
      </div>
    </>
  );
};

export default page;
