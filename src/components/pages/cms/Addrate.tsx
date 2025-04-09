"use client";
import React, { useState } from "react";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
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
import Link from "next/link";

const Addrate = () => {
  return (
    <ContentWrapper>
      <div className="bg-[#fff] p-[40px] rounded-[20px]">
        <AddrateComponent />
      </div>
    </ContentWrapper>
  );
};

const AddrateComponent = () => {
  return (
    <div className="space-y-[24px]">
      <div className="space-y-4">
        <h1 className="text-[20px] font-[500] text-[#181818]">
          Add Agency Rate
        </h1>

        <p className="text-[16px] font-[400] text-[#67696d]">
          This is the fee received by your company on every booking made with
          Flamingo Airline through your platform.
        </p>
      </div>

      <div className="space-y-10">
        <div className="space-y-6">
          <h1 className="text-[16px] font-[500] text-[#181818]">Currency</h1>
          <Dropdown
            options={["Naira", "Dollar", "Pound"]}
            placeholder="Select currency"
            onSelect={(value) => console.log("Selected:", value)}
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-[16px] font-[500] text-[#181818]">Set rate</h1>
          <input
            type="text"
            placeholder="Enter preferred rate"
            className="w-full p-4 rounded-full flex justify-between bg-[#f5f5f5] outine-none placeholder:text-[#9b9ea4] text-[16px] font-[400]  "
          />
        </div>
      </div>

      <SuccessModal />
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
        <Button title="CONTINUE" variant="gray" weight="500" full />
      </DialogTrigger>

      <DialogContent className="w-full lg:min-w-[800px] p-[40px] ">
        <div className="space-y-[40px] flex flex-col items-center  ">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-[500] text-[#181818]">
              Rate Successfully Added
            </DialogTitle>
          </DialogHeader>

          <img
            src="/assets/icons/success-big.svg"
            alt="Success"
            className="w-20 h-20 my-6"
          />

          <DialogDescription className="lg:text-lg text-[14px] text-gray-700 text-center px-4 font-[500]">
            Your rate per booking on designated route has been successfully
            added
          </DialogDescription>

          <Link href="/Dashboard/cms" className="w-full">
            <Button title="VIEW UPDATE" variant="blue" full />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Addrate;
