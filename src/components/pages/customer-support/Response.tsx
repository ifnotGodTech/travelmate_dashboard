"use client";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
import React from "react";
import Button, { ToggleButton } from "@/components/reuseables/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

type Props = {};

const Response = (props: Props) => {
  return (
    <ContentWrapper redirectLink="/Dashboard/support/ticket">
      <div className="bg-[#fff] lg:rounded-[20px]">
        <div className="space-y-6 p-10">
          <div className="">
            <h3 className=" font-[500] lg:text-[16px] text-[14px] text-[#181818]">
              Thursday 13th of Feb.2025 | 08:43AM
            </h3>
          </div>
          <div className="">
            <h1 className=" font-[600] text-[16px] lg:text-[28px] text-[#181818]">
              Respond to Ticket #TKT2025-001
            </h1>
          </div>
          <div className="py-4 px-6 space-y-4 bg-[#ebeced] ">
            <p className="font-[400] lg:text-[18px] text-[14px] text-[#4e4f52]">
              Customer: Kemi Adeoti
            </p>
            <p className="font-[400] lg:text-[18px] text-[14px] text-[#4e4f52]">
              Subject: Flight Cancellation and Refund Request
            </p>
          </div>
          <ReplyBox />

          <div className="flex flex-row justify-between gap-[24px] py-[20px]">
            <Button
              title="Add attachment"
              variant="gray-white"
              border
              weight="600"
              icon="/assets/icons/dark-plus.svg"
              iconPosition="left"
            />
            <ToggleButton
              title="Mark as resolved"
              isActive={false}
              badgeCount={193}
              onClick={() => console.log("Toggle clicked!")}
              variant="gray-white"
              border
            />
          </div>

          <SuccessModal />
        </div>
      </div>
    </ContentWrapper>
  );
};

const SuccessModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="SEND RESPONSE"
          variant="blue"
          full
          icon="/assets/icons/white-send.svg"
          iconPosition="left"
        />
      </DialogTrigger>

      <DialogContent className="w-full lg:min-w-[800px] p-[40px] ">
        <div className="space-y-[40px] flex flex-col items-center  ">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-[500] text-[#181818]">
              Issue Resolved Successfully
            </DialogTitle>
          </DialogHeader>

          <img
            src="/assets/icons/success-big.svg"
            alt="Success"
            className="w-20 h-20 my-6"
          />

          <DialogDescription className="lg:text-lg text-[14px] text-gray-700 text-center px-4 font-[500]">
            The issue has been resolved and response sent to customer.
          </DialogDescription>

          <Link href={"/Dashboard/support"} className="w-full">
            <Button title="GO BACK TO DASHBOARD" variant="blue" full />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ReplyBox = () => {
  return (
    <div className="space-y-6">
      <h1 className="font-[500] lg:text-[20px] text-[14px] text-[#181818]">
        Respond to Customer
      </h1>

      <textarea
        name=""
        id=""
        className="w-full rounded-[12px] py-[16px] px-[24px] placeholder: text-[16px] font-[500] text-[#181818] outline-none border-[1px] border- "
        placeholder="Type your message here..."
        rows={9}
      ></textarea>
    </div>
  );
};

const ButtonS = () => {
  return <div className=""></div>;
};

export default Response;
