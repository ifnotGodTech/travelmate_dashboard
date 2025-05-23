"use client";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
import React, { useEffect, useState } from "react";
import Button from "@/components/reuseables/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Filter } from "@/components/molecues/support/Reuseables";
import { TicketTabContent } from "@/components/molecues/support/Tickets";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] font-[600] text-[#181818]">Tickets</h2>

        <div className="bg-[#023E8A] rounded-[8px] p-4 text-[20px] font-[500] cursor-pointer text-[#fff] ">
          All Escalated tickets
        </div>
      </div>

      <Filter
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="bg-white rounded-[20px] p-4">
        <TicketTabContent
          selectedOption={selectedOption}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default Page;
