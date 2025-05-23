import { useState } from "react";
import React from "react";
import { Filter } from "./Reuseables";

const ReuseableTable = () => {
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
    </div>
  );
};

// All Escalated tickets

export default ReuseableTable;
