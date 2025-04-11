"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation"; // Correct import
import { Calendar } from "lucide-react";
import { SingleMockBookings } from "@/components/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Button from "@/components/reuseables/Button";

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const booking = SingleMockBookings[id];

  if (!booking) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Booking not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="w-full">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => router.back()} // Enable back functionality
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#fff] p-[16px] lg:p-[40px] space-y-6 rounded-[20px]">
        <div className="space-y-2">
          <p className="lg:text-[500] lg:text-[16px] text-[#181818] text-[14px] font-[400]">
            Thursday 13th of Feb., 2025 | 08:43AM
          </p>
        </div>

        {/* Traveler Section */}
        <div className="space-y-6">
          <h2 className="lg:text-[500] lg:text-[20px] text-[#181818] text-[16px] font-[600]">
            Traveler
          </h2>
          <div className="space-y-6">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <img src="/assets/images/profile-image.svg" alt="" />
            </div>
            <div className="space-y-6 w-full">
              {[
                { label: "First Name", value: booking.details.firstName },
                { label: "Last Name", value: booking.details.lastName },
                { label: "Residential Address", value: booking.details.address },
                { label: "Email Address", value: booking.details.email },
              ].map(({ label, value }) => (
                <div key={label} className="flex space-x-1">
                  <div className="w-1/2">
                    <p className="font-inter font-[400] text-[14px] text-[#9B9EA4]">
                      {label}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter font-[500] text-[16px] text-[#9B9EA4]">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Information */}
        <div className="space-y-8">
          <h2 className="lg:text-[500] lg:text-[20px] text-[#181818] text-[16px] font-[600]">
            Travel Information
          </h2>
          <div className="space-y-6">
            <h3 className="text-[14px] lg:text-[16px] font-[500] text-[#181818]">
              Departure Details
            </h3>
            <h3 className="text-[12px] lg:text-[14px] font-[500] text-[#181818]">
              Air Piece Limited
            </h3>
            <div className="space-y-3">
              <p className="text-[12px] lg:text-[14px] font-[500] text-[#181818]">
                Flight Time
              </p>
              <div className="flex space-x-6">
                <Dropdown
                  options={["2:00", "4:00", "9:00"]}
                  placeholder={booking.details.flight.departureTime}
                  onSelect={(value) => console.log("Selected:", value)}
                />
                <Dropdown
                  options={["AM", "PM"]}
                  placeholder="AM"
                  onSelect={(value) => console.log("Selected:", value)}
                />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[12px] lg:text-[14px] font-[500] text-[#181818]">
                Flight Time
              </p>
              <div className="py-4 px-6 rounded-[8px] space-x-4 border-[1px] border-[#9B9EA4] flex items-center w-[200px] cursor-pointer justify-between">
                <span>{booking.details.flight.date}</span>
                <Calendar className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <Button variant="blue" title="CONFIRM UPDATE" full />
      </div>
    </div>
  );
};

// Dropdown Component
type DropdownProps = {
  options: string[];
  placeholder?: string;
  onSelect: (value: string | null) => void;
};

export const Dropdown = ({
  options,
  placeholder = "Select an option",
  onSelect,
}: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className="space-y-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full p-2 rounded-[8px] space-x-4 border-[#9b9ea4] border-[1px] flex justify-between bg-transparent">
            <span>{selectedOption || placeholder}</span>
            <img src="/assets/icons/arrow-down.svg" alt="" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[var(--radix-popper-anchor-width)] min-w-[var(--radix-popper-anchor-width)]"
        >
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              className="w-full text-center px-4 py-2 hover:bg-gray-200"
              onClick={() => handleSelect(option)}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default page;
