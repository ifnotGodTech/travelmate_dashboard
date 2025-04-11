"use client";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
import React from "react";
import { Dropdown } from "../cms/Addrate";
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

const EscalateTicket = () => {
  return (
    <div>
      <ContentWrapper>
        <div className="bg-[#fff] lg:rounded-[20px] ">
          <EscalateDetails />
        </div>
      </ContentWrapper>
    </div>
  );
};

const EscalateDetails = () => {
  return (
    <div className="p-[40px] space-y-[40px]">
      <div className="">
        <h3 className=" font-[500] lg:text-[16px] text-[14px] text-[#181818]">
          Thursday 13th of Feb.2025 | 08:43AM
        </h3>
      </div>
      <div className="">
        <h1 className=" font-[600] text-[16px] lg:text-[28px] text-[#181818]">
          Escalate Issue #TKT2025-001
        </h1>
      </div>
      <Warning />
      <div className="space-y-6">
        <h4 className="font-[500] text-[20px] text-[#181818]">Issue Details</h4>

        <div className="space-y-6 w-full">
          <div className="flex space-x-1">
            <div className="w-1/2">
              <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                Subject
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter font-[500] text-[15px] leading-[100%] tracking-[0%] ">
                Flight Cancellation Request
              </p>
            </div>
          </div>
          <div className="flex space-x-1">
            <div className="w-1/2">
              <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                Priority level
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter font-[500] text-[15px] leading-[100%] tracking-[0%]">
                High
              </p>
            </div>
          </div>
        </div>
      </div>

      <CustomerInfo />

      <Selections />

      <SuccessModal />
    </div>
  );
};

const CustomerInfo = () => {
  return (
    <div className="space-y-6">
      <h4 className="font-[500] text-[20px] text-[#181818]">
        Customer Information
      </h4>

      <div className="space-y-6 w-full">
        <div className="flex space-x-1">
          <div className="w-1/2">
            <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
              First Name
            </p>
          </div>
          <div className="w-1/2">
            <p className="font-inter font-[500] text-[15px] leading-[100%] tracking-[0%] ">
              Kemi
            </p>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-1/2">
            <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
              Last Name
            </p>
          </div>
          <div className="w-1/2">
            <p className="font-inter font-[500] text-[15px] leading-[100%] tracking-[0%]">
              Adeoti
            </p>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-1/2">
            <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
              Phone Number
            </p>
          </div>
          <div className="w-1/2">
            <p className="font-inter font-[500] text-[15px] leading-[100%] tracking-[0%]">
              +234 8012 3456 789
            </p>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-1/2">
            <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
              Email Address
            </p>
          </div>
          <div className="w-1/2">
            <p className="font-inter font-[500] text-[15px] leading-[100%] tracking-[0%]">
              kemiadeoti@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Selections = () => {
  return (
    <div className="space-y-6 mt-[24px]">
      <div className="space-y-10">
        <div className="space-y-6">
          <h1 className="text-[16px] font-[500] text-[#181818]">
            Escalation Level:
          </h1>
          <Dropdown
            options={[
              "Department manager",
              "Supervisor",
              "Director",
              "Executive Team",
            ]}
            placeholder="Select Route"
            onSelect={(value) => console.log("Selected:", value)}
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-[16px] font-[500] text-[#181818]">
            Escalation Level Email:
          </h1>
          <input
            type="text"
            placeholder="example@gmail.com"
            className="w-full p-4 rounded-full flex justify-between bg-transparent  border-[#9b9ea4] border-[1px] outine-none placeholder:text-[#9b9ea4] text-[16px] font-[400] "
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-[16px] font-[500] text-[#181818]">
            Reason for Escalation:
          </h1>
          <Dropdown
            options={[
              "Customer Urgent Need",
              "Unresolved Past Issue",
              "VIP Customer",
              "Formal Complaint",
            ]}
            placeholder="info@departmentmanager.com"
            onSelect={(value) => console.log("Selected:", value)}
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-[16px] font-[500] text-[#181818]">
            Escalation Note:
          </h1>
          <textarea
            maxLength={5}
            placeholder="Please provide additional information on what has been attempted so far"
            className="w-full p-4 rounded-[8px] flex justify-between bg-[#f5f5f5] outine-none placeholder:text-[#9b9ea4] text-[16px] font-[400]  "
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-[16px] font-[500] text-[#181818]">
            Response Time Required:
          </h1>
          <Dropdown
            options={[
              "1 Hour (Emergency)",
              "4 Hours (Urgent)",
              "24 Hours (High priority)",
            ]}
            placeholder="info@departmentmanager.com"
            onSelect={(value) => console.log("Selected:", value)}
          />
        </div>
      </div>
    </div>
  );
};

const Warning = () => {
  return (
    <div className="py-[24px]">
      <div className="py-4 px-6 bg-[#FFE2D2] rounded-[12px] gap-x-[16px] border-[#FF6F1E] border-[1px] flex items-start ">
        <div className="">
          <img src="/assets/icons/dark-warning.svg" alt="" />
        </div>
        <div className="flex-1 lg:space-y-[16px] space-y-[8px]">
          <h2 className="font-[500] lg:text-[20px] text-[14px] text-[#181818]">
            You are about to escalate this issue
          </h2>
          <p className="font-[400] lg:text-[16px] text-[10px] text-[#67696d]">
            Escalation will notify management and prioritize this ticket for
            immediate attention. Please provide additional details to help
            resolve this issue quickly.
          </p>
        </div>
      </div>
    </div>
  );
};

const SuccessModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="ESCALATE REQUEST"
          variant="blue"
          full
          icon="/assets/icons/white-caution.svg"
          iconPosition="left"
        />
      </DialogTrigger>

      <DialogContent className="w-full lg:min-w-[800px] p-[40px] ">
        <div className="space-y-[40px] flex flex-col items-center  ">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-[500] text-[#181818]">
              Issue Escalated Successfully
            </DialogTitle>
          </DialogHeader>

          <img
            src="/assets/icons/success-big.svg"
            alt="Success"
            className="w-20 h-20 my-6"
          />

          <DialogDescription className="lg:text-lg text-[14px] text-gray-700 text-center px-4 font-[500]">
            The issue has been escalated and is now under review.
          </DialogDescription>

          <Link href={"/Dashboard/support"} className="w-full">
            <Button title="GO BACK TO DASHBOARD" variant="blue" full />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EscalateTicket;
