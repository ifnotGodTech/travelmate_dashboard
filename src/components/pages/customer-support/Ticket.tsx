import ContentWrapper from "@/components/reuseables/ContentWrapper";
import React from "react";
import Button from "@/components/reuseables/Button";
import Link from "next/link";

const Ticket = () => {
  return (
    <ContentWrapper>
      <div className="bg-[#fff] lg:rounded-[20px] ">
        <div className="p-[40px] space-y-[24px]">
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
          <div className="space-y-6">
            <h4 className="font-[500] text-[20px] text-[#181818]">Details</h4>

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

          <div className="flex flex-col lg:flex-row justify-center gap-[24px] py-[20px]">
            <Link href={"/Dashboard/support/respond"} className="w-full">
              <Button
                title="SEND RESPONSE"
                variant="light-blue"
                weight="500"
                icon="/assets/icons/blue-send.svg"
                iconPosition="left"
                full
              />
            </Link>
            <Link
              href={"/Dashboard/support/escalate-ticket"}
              className="w-full"
            >
              <Button
                title="ESCALATE REQUEST"
                variant="orange"
                weight="500"
                icon="/assets/icons/caution.svg"
                iconPosition="left"
                full
              />
            </Link>
          </div>
        </div>
      </div>
    </ContentWrapper>
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

export default Ticket;
