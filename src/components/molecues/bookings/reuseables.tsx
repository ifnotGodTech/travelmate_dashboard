import { DatePairDialog } from "@/components/reuseables/DateDialog";
import { FilterDropdown } from "@/components/reuseables/FilterDropdown";
import { useState, useEffect } from "react";
import { Label } from "recharts";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export const GridValues = ({ title, value }: any) => {
  return (
    <div className="space-y-2">
      <h1 className="text-[16px] font-[500] text-[#4E4F52]">{title}</h1>
      <p className="text-[16px] font-[500] text-[#181818]">{value}</p>
    </div>
  );
};

export const FlexValues = ({ title, value, red }: any) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-[16px] font-[500] text-[#4E4F52]">{title}</h1>
      <p
        className={
          red
            ? "text-[16px] font-[500] text-[#D72638] text-end"
            : "text-[#181818]"
        }
      >
        {value}
      </p>
    </div>
  );
};

export const Policy = ({ List }: any) => {
  return (
    <div className="bg-[#fff] p-[24px] rounded-[12px]">
      <h1 className="text-[20px] font-[600] text-[#181818] mb-[16px]">
        Cancellation Policy
      </h1>

      <ul className="space-y-[12px] list-disc pl-3 list-disc:bg-[#181818] ">
        {List.map((item: any, index: any) => (
          <li key={index} className="text-[16px] font-[400] text-[#4E4F52]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const BookingTableDropdown = ({}: {}) => {
  const options = [{ label: "View Details" }, { label: "Cancel Booking" }];

  return (
    <div className="relative overflow-visible">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer select-none px-2 py-1 text-lg">⋮</div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="end"
          className="z-50 max-w-[180px] shadow-lg border border-gray-200 rounded-md bg-white"
        >
          {options.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onClick={option.action}
              className={`cursor-pointer select-none ${
                option.label === "Cancel Booking"
                  ? "text-red-500 hover:text-red-600 "
                  : ""
              } `}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const LocationTag = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center space-x-4 border-[1px] border-[#9B9EA4] py-[16px] rounded-[12px] space-y-[8px] ">
        <div className="text-center">
          <p className="text-[18px] font-[600] text-[#181818] ">2:00pm</p>
          <p className="text-[18px] font-[600] text-[#67696D] ">Lagos (LOS)</p>
        </div>
        <div className="text-center text-gray-500 text-xl">
          {"------------->"}
        </div>
        <div className="text-center space-y-[8px] ">
          <p className="text-[18px] font-[600] text-[#181818] ">4:00pm</p>
          <p className="text-[18px] font-[600] text-[#67696D]">Abuja (ABV)</p>
        </div>
      </div>
    </div>
  );
};

export const Filter = ({ datePickerOpen, setDatePickerOpen }: any) => {
  //   const [inputValue, setInputValue] = useState("");

  //   useEffect(() => {
  //     setSearchTerm("");
  //     setInputValue("");
  //   }, [activeTab]);

  //   const handleApply = () => {
  //     if (activeTab === "chat") {
  //       console.log("Applying range:", selectedStartDate, selectedEndDate);
  //     } else {
  //       console.log("Applying single date:", selectedDate);
  //     }
  //   };

  return (
    <div className="w-full px-4 lg:px-0">
      <div
        className="
          flex justify-between items-center gap-4 flex-col lg:flex-row w-full
          lg:space-x-12
        "
      >
        <div
          className="
            flex items-center flex-grow min-w-[220px] max-w-full
            border border-[#ACAEB3] rounded-full
            py-2 px-4 w-full
          "
        >
          <img
            src="/assets/icons/search.svg"
            alt="Search Icon"
            className="w-4 h-4 flex-shrink-0"
          />

          <input
            type="text"
            className="flex-grow ml-2 text-[16px] placeholder:text-[#9B9EA4] text-[#181818] placeholder:font-light focus:outline-none placeholder:text-[16px] font-[400] min-w-0"
            placeholder="Search by Name, Type, Location"
            // value={inputValue}
            // onChange={(e) => {
            //   const val = e.target.value;
            //   setInputValue(val);
            //   if (val === "") {
            //     setSearchTerm("");
            //   }
            // }}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     setSearchTerm(inputValue);
            //   }
            // }}
          />
        </div>

        <div className="flex justify-between w-full items-center ">
          <FilterDropdown
            options={[
              {
                id: 1,
                label: "Paid",
              },
              {
                id: 2,
                label: "Cancelled",
              },
              {
                id: 3,
                label: "Pending Refund",
              },
              {
                id: 4,
                label: "Refunded",
              },
            ]}
          />

          <div className="flex space-x-3">
            <div
              className="
            flex items-center w-full gap-3
          "
            >
              <div
                className="
              flex items-center bg-white border border-[#EBECED] rounded-full
              py-3 px-5 cursor-pointer flex-shrink-0
              shadow-sm lg:shadow-none
            "
                onClick={() => setDatePickerOpen(true)}
              >
                <img
                  src="/assets/icons/calendar.svg"
                  alt="Calendar Icon"
                  className="w-6 flex-shrink-0"
                />
                <div className="ml-2 flex flex-col lg:flex-row lg:items-center">
                  <span className="text-[14px] font-light text-[#181818]">
                    Select Date
                  </span>
                  <span className="text-[14px] font-light text-[#9B9EA4] hidden xl:inline-block lg:ml-1 truncate">
                    {"yyyy-mm-dd"} - {"yyyy-mm-dd"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DatePairDialog
        isOpen={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
        // selectedStartDate={selectedStartDate}
        // setSelectedStartDate={setSelectedStartDate}
        // selectedEndDate={selectedEndDate}
        // setSelectedEndDate={setSelectedEndDate}
      />
    </div>
  );
};
