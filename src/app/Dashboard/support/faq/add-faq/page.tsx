"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Button from "@/components/reuseables/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {};

const page = (props: Props) => {
  return (
    <div className=" lg:bg-transparent">
      <AddComponent />
    </div>
  );
};

const AddComponent = () => {
  return (
    <div className="space-y-6 py-4 px-6 rounded-[8px] bg-[#fff]">
      <div className="space-y-4">
        <h1 className="font-[600] text-[16px] lg:text-[20px] leading-[#100] text-[#181818] ">
          Add New FAQ
        </h1>

        <div className="space-y-6">
          <h1 className="text-[14px] lg:text-[16px] font-[500] text-[#181818]">
            Category:
          </h1>
          <Dropdown
            options={["Flights", "Hotels", "Car Rentals", "Account"]}
            placeholder="Selete category"
            onSelect={(value) => console.log("Selected:", value)}
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-[14px] lg:text-[16px] font-[500] text-[#181818]">
            Question:
          </h1>
          <input
            type="text"
            placeholder="Enter a frequently asked question"
            className="w-full p-4 rounded-full flex justify-between outine-none border-[1px] border-[#9B9EA4] placeholder:text-[#9b9ea4] text-[16px] font-[400]  "
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-[14px] lg:text-[16px] font-[500] text-[#181818]">
            Answer:
          </h1>
          <textarea
            name=""
            id=""
            className="w-full rounded-[8px] p-[16px] bg-[#F5F5F5] placeholder: text-[16px] font-[500] text-[#181818] outline-none border-[1px] border- "
            placeholder="Provide an answer"
            rows={5}
          ></textarea>
        </div>

        <SuccessModal />
      </div>
    </div>
  );
};

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
      {/* Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full p-4 rounded-full border-[#9b9ea4] border-[1px]  flex justify-between bg-transparent">
            {selectedOption || placeholder}
            <img src="/assets/icons/arrow-down.svg" alt="" className="" />
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

const SuccessModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="blue" full title="CONTINUE" />
      </DialogTrigger>

      <DialogContent className="w-full lg:min-w-[800px] p-[40px] ">
        <div className="space-y-[40px] flex flex-col items-center  ">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-[500] text-[#181818]">
              FAQ Added Successfully
            </DialogTitle>
          </DialogHeader>

          <img
            src="/assets/icons/success-big.svg"
            alt="Success"
            className="w-20 h-20 my-6"
          />

          <DialogDescription className="lg:text-lg text-[14px] text-gray-700 text-center px-4 font-[500]">
            You have successfully added a new FAQ for customers
          </DialogDescription>

          <Button title="GO BACK TO DASHBOARD" variant="blue" full />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default page;
