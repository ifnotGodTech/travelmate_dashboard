"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { FaqSection } from "./Faq";
import { TicketTabContent } from "./Tickets";
import ChatTabContent from "./ChatTabComponent";
import { Filter } from "./Reuseables";
import { format } from "date-fns";
import { MessageTabContent } from "./Chats/MessageChat";

const TicketTable: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

  // Track active tab
  const [activeTab, setActiveTab] = useState("ticket");

  return (
    <div className="pb-20 lg:pb-0">
      {/* padding bottom so content not hidden on small screens */}
      <Tabs
        defaultValue="ticket"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="space-y-[40px]"
      >
        <div className="flex justify-between items-center">
          <TabsList className="lg:w-[436px] w-full bg-[#EBECED] rounded-[12px] flex justify-between items-center h-[64px]">
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

          {activeTab !== "faq" && (
            <div className="hidden lg:flex gap-6">
              {activeTab === "chat" ? (
                <div
                  className="p-4 rounded-[8px] bg-[#023E8A] text-[20px] font-[500] text-[#fff] cursor-pointer"
                  onClick={() => router.push("/Dashboard/support/chats")}
                >
                  All Chat
                </div>
              ) : (
                <>
                  <div
                    className="p-4 rounded-[8px] border-[1px] border-[#023E8A] text-[20px] font-[500] text-[#023E8A] cursor-pointer"
                    onClick={() => router.push("/Dashboard/support/ticket")}
                  >
                    View all tickets
                  </div>
                  <div
                    className="p-4 rounded-[8px] bg-[#023E8A] text-[20px] font-[500] text-[#fff] cursor-pointer"
                    onClick={() =>
                      router.push("/Dashboard/support/ticket/escalates")
                    }
                  >
                    All Escalated tickets
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {activeTab !== "faq" && (
          <Filter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            datePickerOpen={datePickerOpen}
            setDatePickerOpen={setDatePickerOpen}
            filterOption={activeTab}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}

        <div className="bg-[#FFFFFF] py-[16px] rounded-[8px] shadow-md w-full ">
          <TabsContent value="ticket">
            <TicketTabContent
              selectedOption={selectedOption}
              searchTerm={searchTerm}
              date={selectedDate}
            />
          </TabsContent>
          <TabsContent value="chat">
            <MessageTabContent
              selectedOption={selectedOption}
              searchTerm={searchTerm}
              date={selectedDate}
            />
          </TabsContent>
          <TabsContent value="faq">
            <FaqSection />
          </TabsContent>
        </div>
      </Tabs>

      {activeTab !== "faq" && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around py-3 px-4 shadow-lg z-50">
          {activeTab === "chat" ? (
            <button
              onClick={() => router.push("/Dashboard/support/chats")}
              className="bg-[#023E8A] text-white rounded-md px-6 py-2 font-semibold w-full "
            >
              All Chat
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/Dashboard/support/ticket")}
                className="bg-transparent border border-[#023E8A] text-[#023E8A] rounded-md px-6 py-2 font-semibold"
              >
                View all tickets
              </button>
              <button
                onClick={() =>
                  router.push("/Dashboard/support/ticket/escalates")
                }
                className="bg-[#023E8A] text-white rounded-md px-6 py-2 font-semibold"
              >
                All Escalated tickets
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketTable;
