"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import Button from "@/components/reuseables/Button";
import { FaqSection } from "./Faq";
import { TicketTabContent } from "./Tickets";
import ChatTabContent from "./ChatTabComponent";
import { AllContent } from "./AllComponents";

const TicketTable: React.FC = () => {
  const handleTabChange = (tab: string) => {
    // if (!tabData[tab as keyof TabData].length) {
    //   fetchData(tab as keyof TabData);
    // }
  };

  return (
    <div className="">
      <Tabs
        defaultValue="all"
        className="space-y-[40px]"
        onValueChange={handleTabChange}
      >
        <TabsList className="lg:w-[436px] w-full bg-[#EBECED] rounded-[12px] flex justify-between items-center h-[64px]">
          <TabsTrigger
            value="all"
            className="px-[24px] h-full rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-black flex items-center justify-center"
          >
            All
          </TabsTrigger>
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
        <div className="bg-[#FFFFFF] py-[16px] rounded-[8px] ">
          <TabsContent value="all">
            <AllContent />
          </TabsContent>
          <TabsContent value="ticket">
            <TicketTabContent />
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
