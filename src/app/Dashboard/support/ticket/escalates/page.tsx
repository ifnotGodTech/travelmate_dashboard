"use client";
import { useState } from "react";
import { Filter } from "@/components/molecues/support/Reuseables";
import { EscaleteTable } from "@/components/molecues/support/EscalatedTable";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="">
        <img
          src="/assets/icons/arrow-back.svg"
          alt=""
          className="cursor-pointer"
          onClick={() => router.back()}
        />
      </div>
      <Filter
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterOption={"ticket"}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        datePickerOpen={datePickerOpen}
        setDatePickerOpen={setDatePickerOpen}
      />
      <div className="p-4 bf-white shadow-sm rounded-[2px]">
        <EscaleteTable
          selectedOption={selectedOption}
          searchTerm={searchTerm}
          date={selectedDate}
        />
      </div>
    </div>
  );
};

export default page;
