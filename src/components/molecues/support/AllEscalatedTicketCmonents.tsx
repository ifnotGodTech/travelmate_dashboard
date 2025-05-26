"use client";
import { useState } from "react";
import { format } from "date-fns";
import { FilterDropdown } from "@/components/reuseables/FilterDropdown";
import DateRangeDialog from "@/components/reuseables/DateDialog";

export const Filter = ({
  searchTerm,
  setSearchTerm,
  selectedOption,
  setSelectedOption,
}: any) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  // Format date for display
  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
        dateRange.to,
        "dd/MM/yyyy"
      )}`;
    }
    return "dd/mm/yyyy - dd/mm/yyyy";
  };
  return (
    <div className="">
      <div className="flex space-y-[12px] lg:space-y-0 space-x-[47px] justify-between flex-col lg:flex-row  items-center">
        {/* Search Bar */}
        <div className="w-full lg:py- py-[10px] px-[12px] lg:px-6 flex items-center border border-[#ACAEB3] rounded-full space-x-2">
          <img
            src="/assets/icons/search.svg"
            alt="Search Icon"
            className="w-4 h-4"
          />
          <input
            type="text"
            className="flex-1 text-[16px] placeholder:text-[#9B9EA4] text-[#181818] placeholder:font-light focus:outline-none placeholder:text-[16px] font-[400]"
            placeholder="Search by Name , Email or Ticket ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center space-x-3 w-full ">
          <FilterDropdown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            options={[
              { label: "All", value: "" },
              { label: "New", value: "new" },
              { label: "In Progress", value: "in_progress" },
              { label: "Resolved", value: "resolved" },
            ]}
          />

          {/* Date Filter - Now Clickable */}
          <div
            className="flex items-center lg:py-4 py-[6px] px-[8px] lg:px-[px] bg-white border lg:shadow-none shadow-sm border-[#EBECED] rounded-full space-x-1 cursor-pointer flex-1 "
            onClick={() => setDatePickerOpen(true)}
          >
            <img
              src="/assets/icons/calendar.svg"
              alt="Calendar Icon"
              className="w-6"
            />
            <div className="lg:flex items-center">
              <span className="text-[14px] font-light text-[#181818]">
                Filter by Date
              </span>
              <span className="text-[14px] font-light text-[#9B9EA4] hidden xl:block ">
                :{" "}
                {dateRange.from ? formatDateRange() : "dd/mm/yyyy - dd/mm/yyyy"}
              </span>
            </div>
          </div>
        </div>
        <div className=" text-[#023E8A] text-[14px] font-[400] p-3 border-[1px] border-[#023E8A] rounded-[8px] cursor-pointer ">
          Apply
        </div>
      </div>

      <DateRangeDialog
        isOpen={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
    </div>
  );
};
