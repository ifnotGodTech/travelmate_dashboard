"use client";
import React from "react";
import { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const page = () => {
  return (
    <div>
      <BookingTab />
    </div>
  );
};

export default page;

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

import { format } from "date-fns";
import { Filter } from "@/components/molecues/bookings/reuseables";
import BookingTable from "@/components/molecues/bookings/BookingTable";

const BookingTab: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<
    string | undefined
  >(undefined);
  const [selectedEndDate, setSelectedEndDate] = useState<string | undefined>(
    undefined
  );
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );

  // Track active tab with localStorage persistence
  const [activeTab, setActiveTab] = useState<string>("ticket");

  // Load saved tab from localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTab = window.localStorage.getItem("bactiveTab");
      if (savedTab) {
        setActiveTab(savedTab);
      }
    }
  }, []);

  // Save the active tab to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("bactiveTab", activeTab);
    }
  }, [activeTab]);

  // Reset filters when the active tab changes
  useEffect(() => {
    setSearchTerm("");
    setSelectedOption("");
    setSelectedDate(undefined);
  }, [activeTab]);

  return (
    <div className="pb-20 lg:pb-0  ">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="space-y-[40px]"
      >
        <div className="flex justify-between items-center flex-col lg:flex-row gap-4">
          <TabsList className="lg:w-[436px] w-full bg-[#fff] rounded-[12px] flex justify-between items-center h-[64px]">
            <TabsTrigger
              value="ticket"
              className="px-[24px] h-full rounded-[8px] data-[state=active]:bg-[#023E8A] data-[state=active]:text-white flex items-center justify-center"
            >
              Stays
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="px-[24px] h-full rounded-[8px] data-[state=active]:bg-[#023E8A] data-[state=active]:text-white flex items-center justify-center"
            >
              Flights
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="px-[24px] h-full rounded-[8px] data-[state=active]:bg-[#023E8A] data-[state=active]:text-white flex items-center justify-center"
            >
              Airport Taxis
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row gap-2 w-full lg:w-auto ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="px-6 py-4 bg-[#fff] flex items-center space-x-4 rounded-[8px] cursor-pointer justify-center w-full md:w-auto ">
                  <span className="text-[#181818] text-[14px] font-[400]  ">
                    Currency: NGN – Nigerian Naira (₦)
                  </span>{" "}
                  <img
                    src="/assets/icons/chevron-down.svg"
                    alt=""
                    className="rotate-90"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-full mt-1 border border-gray-300 rounded-lg bg-white shadow-lg space-y-2"
                align="start"
              >
                <DropdownMenuItem
                  // onClick={() => handleSelect(option)} // Set selected option
                  className={`px-3 py-2 font-[400] text-[12px] text-[#181818]`}
                >
                  NGN – Nigerian Naira (₦)
                </DropdownMenuItem>
                <DropdownMenuItem
                  // onClick={() => handleSelect(option)} // Set selected option
                  className={`px-3 py-2 font-[400] text-[12px] text-[#181818] `}
                >
                  USD – United States Dollar ($)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div
              className="flex items-center space-x-2 py-4 px-6 bg-[#FF6F1E] rounded-[8px] cursor-pointer p-[6px] justify-center w-full md:w-auto "
              // onClick={handleExport}
            >
              <img
                src="/assets/icons/orange-download.svg"
                alt=""
                className=" lg:w-auto"
              />
              <span className="font-[600] text-[16px] lg:text-[16px] text-[#fff]">
                Export as CSV file
              </span>
            </div>
          </div>
        </div>

        <Filter
          datePickerOpen={datePickerOpen}
          setDatePickerOpen={setDatePickerOpen}
        />

        <BookingTable />

        {/* {activeTab !== "faq" && (
          // <Filter
          //   searchTerm={searchTerm}
          //   setSearchTerm={setSearchTerm}
          //   selectedOption={selectedOption}
          //   setSelectedOption={setSelectedOption}
          //   datePickerOpen={datePickerOpen}
          //   setDatePickerOpen={setDatePickerOpen}
          //   filterOption={activeTab}
          //   selectedDate={selectedDate}
          //   setSelectedDate={setSelectedDate}
          //   activeTab={activeTab}
          //   selectedStartDate={selectedStartDate}
          //   setSelectedStartDate={setSelectedStartDate}
          //   selectedEndDate={selectedEndDate}
          //   setSelectedEndDate={setSelectedEndDate}
          // />
        )} */}
      </Tabs>
    </div>
  );
};
