"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { FaqSection } from "./Faq";
import { TicketTabContent } from "./Tickets";
import ChatTabContent from "./ChatTabComponent";
import { AllContent } from "./AllComponents";
import { Filter, TicketDetailsDialog } from "./Reuseables";
import { format } from "date-fns";

const TicketTable: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
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
      <Tabs
        defaultValue="ticket"
        className="space-y-[40px]"
        // onValueChange={handleTabChange}
      >
        <div className="flex justify-between items-center">
          <TabsList className="lg:w-[436px] w-full bg-[#EBECED] rounded-[12px] flex justify-between items-center h-[64px]">
            {/* <TabsTrigger
            value="all"
            className="px-[24px] h-full rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-black flex items-center justify-center"
          >
            All
          </TabsTrigger> */}
            <TabsTrigger
              value="ticket"
              className="px-[24px] h-full rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-black flex items-center justify-center"
            >
              Ticket
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="px-[24px] h-full rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-black flex items-center justify-center"
            >
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="px-[24px] h-full rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-black flex items-center justify-center"
            >
              FAQ
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-6">
            <div
              className="p-4 rounded-[8px] border-[1px] border-[#023E8A] text-[20px] font-[500] text-[#023E8A] cursor-pointer "
              onClick={() => router.push("/Dashboard/support/ticket")}
            >
              View all tickets
            </div>
            <div className="p-4 rounded-[8px] bg-[#023E8A] text-[20px] font-[500] text-[#fff] cursor-pointer ">
              All Escalated tickets
            </div>
          </div>
        </div>
        <Filter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedOption={selectedOption}
          setSeletedOption={setSelectedOption}
          setDatePickerOpen={setDatePickerOpen}
          dateRange={dateRange}
          formatDateRange={formatDateRange}
          datePickerOpen={datePickerOpen}
          setDateRange={setDateRange}
          setSelectedOption={setSelectedOption}
        />
        <div className="bg-[#FFFFFF] py-[16px] rounded-[8px] shadow-md ">
          <TabsContent value="ticket">
            <TicketTabContent
              selectedOption={selectedOption}
              searchTerm={searchTerm}
            />
          </TabsContent>
          <TabsContent value="chat">
            <ChatTabContent />
          </TabsContent>
          <TabsContent value="faq">
            <FaqSection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TicketTable;
