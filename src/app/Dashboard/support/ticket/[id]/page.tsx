"use client";
import ContentWrapper from "@/components/reuseables/ContentWrapper";
import React, { useEffect, useState } from "react";
import Button from "@/components/reuseables/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetTicket } from "@/hooks/api/ticket";
import { format } from "date-fns";

const Page = () => {
  const { id }: { id: string } = useParams();

  const { data, loading } = useGetTicket({
    TicketId: id as string,
    initalFetch: true,
    successCallback: (message) => {
      console.log(message);
    },
    errorCallback: (error) => {
      console.error(error);
    },
  });

  if (loading) {
    return <LoadingState />;
  }

  return (
    <ContentWrapper>
      <div className="bg-[#fff] lg:rounded-[20px]">
        <div className="p-[40px] space-y-[24px]">
          <div>
            <h3 className="font-[500] lg:text-[16px] text-[14px] text-[#181818]">
              {data?.created_at
                ? format(
                    new Date(data.created_at),
                    "EEEE do 'of' MMM.yyyy | hh:mmaaa"
                  )
                : "Date not available"}
            </h3>
          </div>
          <div>
            <h1 className="font-[600] text-[16px] lg:text-[28px] text-[#181818]">
              Escalate Issue #{data?.ticket_id}
            </h1>
          </div>
          <div className="space-y-6">
            <h4 className="font-[500] text-[20px] text-[#181818]">Details</h4>
            <div className="space-y-6 w-full">
              <div className="flex space-x-1">
                <div className="w-1/2">
                  <p className="font-inter font-[400] text-[14px]">Title</p>
                </div>
                <div className="w-1/2">
                  <p className="font-inter font-[500] text-[15px]">
                    {data?.title}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-1/2">
                  <p className="font-inter font-[400] text-[14px]">Category</p>
                </div>
                <div className="w-1/2">
                  <p className="font-inter font-[500] text-[15px]">
                    {data?.category}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-1/2">
                  <p className="font-inter font-[400] text-[14px]">Status</p>
                </div>
                <div className="w-1/2">
                  <p className="font-inter font-[500] text-[15px]">
                    {data?.status}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-1/2">
                  <p className="font-inter font-[400] text-[14px]">
                    Description
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="font-inter font-[500] text-[15px]">
                    {data?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CustomerInfo user={data?.user} />

          <div className="flex flex-col lg:flex-row justify-center gap-[24px] py-[20px]">
            <Link href={`/Dashboard/support/ticket/${id}/respond`} className="w-full">
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
              href={`/Dashboard/support/ticket/${id}/escalate`}
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

const CustomerInfo = ({ user }: any) => {
  const { email, first_name, last_name } = user || {};
  return (
    <div className="space-y-6">
      <h4 className="font-[500] text-[20px] text-[#181818]">
        Customer Information
      </h4>

      <div className="space-y-6 w-full">
        <div className="flex space-x-1">
          <div className="w-1/2">
            <p className="font-inter font-[400] text-[14px]">First Name</p>
          </div>
          <div className="w-1/2">
            <p className="font-inter font-[500] text-[15px]">
              {first_name || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-1/2">
            <p className="font-inter font-[400] text-[14px]">Last Name</p>
          </div>
          <div className="w-1/2">
            <p className="font-inter font-[500] text-[15px]">
              {last_name || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-1/2">
            <p className="font-inter font-[400] text-[14px]">Email Address</p>
          </div>
          <div className="w-1/2">
            <p className="font-inter font-[500] text-[15px] break-all">
              {email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingState = () => {
  return (
    <ContentWrapper>
      <div className="bg-[#fff] lg:rounded-[20px]">
        <div className="p-[40px] space-y-[24px]">
          <div className="bg-gray-300 animate-pulse h-[50px] rounded-[12px] w-full"></div>
          <div className="bg-gray-300 animate-pulse h-[50px] rounded-[12px] w-full"></div>
          <div className="bg-gray-300 animate-pulse h-[50px] rounded-[12px] w-full"></div>
          <div className="bg-gray-300 animate-pulse h-[50px] rounded-[12px] w-full"></div>
          <div className="bg-gray-300 animate-pulse h-[50px] rounded-[12px] w-full"></div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Page;
