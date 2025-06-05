"use client";
import { useState } from "react";
import React from "react";
import DateRangeDialog, {
  DatePairDialog,
} from "@/components/reuseables/DateDialog";
import { useExportCSV } from "@/hooks/api/user";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { format } from "date-fns";
import { FilterDropdown } from "@/components/reuseables/FilterDropdown";
import { UsersTable } from "@/components/molecues/user/RegisterUserTable";
import { DeletedUsersTable } from "@/components/molecues/user/DeletedUsers";

const page = () => {
  return (
    <div className="space-y-[24px]">
      <Filter />
    </div>
  );
};

const Filter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const { onExportCSV } = useExportCSV();
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("registerUser");

  // Date states
  const [selectedStartDate, setSelectedStartDate] = useState<string | "">("");
  const [selectedEndDate, setSelectedEndDate] = useState<string | "">("");

  // Helper to format date range display string
  const formatDateRange = () => {
    if (selectedStartDate && selectedEndDate) {
      return `${selectedStartDate} - ${selectedEndDate}`;
    }
    return "YYYY-MM-DD - YYYY-MM-DD";
  };

  // Build dateRange object for tables
  const dateRange = {
    from: selectedStartDate,
    to: selectedEndDate,
  };

  const handleExport = () => {
    onExportCSV({
      successCallback: () => {
        console.log("CSV exported successfully!");
      },
      errorCallback: (error) => {
        console.error("Error during CSV export:", error.message);
      },
    });
  };

  return (
    <div className="space-y-[24px] w-full">
      <div className="flex justify-between items-center w-full">
        <div className="w-full">
          <Tabs
            defaultValue="registerUser"
            className="space-y-[20px] w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className="flex lg:justify-between space-x-[5px] ">
              <TabsList className="bg-[#fff] lg:shadow-none shadow-sm rounded-[10px] flex justify-between items-center p-2 h-[44px] lg:h-[53px]">
                <TabsTrigger
                  value="registerUser"
                  className="p-[10px] rounded-[4px] text-[#181818] data-[state=active]:bg-[#023E8A] data-[state=active]:text-white flex items-center justify-center text-[12px] lg:text-[14px] font-[500]"
                >
                  Registered Accounts
                </TabsTrigger>
                <TabsTrigger
                  value="deletedUser"
                  className="p-[10px] rounded-[8px] text-[#181818] data-[state=active]:bg-[#023E8A] data-[state=active]:text-white flex items-center justify-center text-[12px] lg:text-[14px] font-[500]"
                >
                  Deleted Accounts
                </TabsTrigger>
              </TabsList>

              <div
                className="flex items-center space-x-2 lg:py-4 lg:px-6 bg-[#FF6F1E] rounded-[8px] cursor-pointer p-[6px]"
                onClick={handleExport}
              >
                <img
                  src="/assets/icons/orange-download.svg"
                  alt=""
                  className="w-[10px] lg:w-auto"
                />
                <span className="font-[600] text-[10px] lg:text-[16px] text-[#fff]">
                  Export as CSV file
                </span>
              </div>
            </div>

            <div className="flex space-y-[12px] lg:space-y-0 lg:space-x-4 justify-between flex-col lg:flex-row items-center">
              <div className="lg:min-w-[375px] w-full lg:py-4 py-[10px] px-[12px] lg:px-6 flex items-center border border-[#ACAEB3] rounded-full space-x-2">
                <img
                  src="/assets/icons/search.svg"
                  alt="Search Icon"
                  className="w-6 h-6"
                />
                <input
                  type="text"
                  className="flex-1 text-[16px] placeholder:text-[#9B9EA4] text-[#181818] placeholder:font-light focus:outline-none placeholder:text-[16px] font-[400]"
                  placeholder="Search by Email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center space-x-3 w-full">
                {activeTab === "registerUser" && (
                  <FilterDropdown
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    options={[
                      { label: "All", value: "" },
                      { label: "Active", value: "true" },
                      { label: "Deactivated", value: "false" },
                    ]}
                  />
                )}

                <div
                  className="flex items-center lg:py-4 py-[10px] px-[12px] lg:px-6 bg-white border lg:shadow-none shadow-sm border-[#EBECED] rounded-full space-x-2 cursor-pointer"
                  onClick={() => setDatePickerOpen(true)}
                >
                  <img
                    src="/assets/icons/calendar.svg"
                    alt="Calendar Icon"
                    className="w-6"
                  />
                  <div className="lg:flex items-center space-x-1">
                    <span className="text-[14px] font-light text-[#181818]">
                      Filter by Date
                    </span>
                    <span className="text-[14px] font-light text-[#9B9EA4] hidden xl:block">
                      : {formatDateRange()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <TabsContent value="registerUser">
                <UsersTable
                  searchTerm={searchTerm}
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                  selectedOption={selectedOption}
                />
              </TabsContent>
              <TabsContent value="deletedUser">
                <DeletedUsersTable
                  searchTerm={searchTerm}
                  selectedOption={selectedOption}
                  dateRange={dateRange}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      <DatePairDialog
        isOpen={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
        selectedStartDate={selectedStartDate}
        setSelectedStartDate={setSelectedStartDate}
        selectedEndDate={selectedEndDate}
        setSelectedEndDate={setSelectedEndDate}
      />
    </div>
  );
};

export default page;
