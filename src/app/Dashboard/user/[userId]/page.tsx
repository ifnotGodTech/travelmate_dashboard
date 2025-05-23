"use client";
import Button from "@/components/reuseables/Button";
import React from "react";
import { useGetUser, useDeactivateUser } from "@/hooks/api/user";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { UserActivityTable } from "@/components/molecues/user/UserActivities";

const page = () => {
  return (
    <div>
      <ProfileComponent />
    </div>
  );
};

// Utility CSS classes for common styles
const commonTextStyle =
  "font-inter font-[400] text-[14px] leading-[100%] tracking-[0%]";
const boldTextStyle =
  "font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] text-[#181818]";
const sectionHeading =
  "font-[600] text-[14px] lg:text-[20px] lg:font-[500] text-[#181818]";
const sectionContainer = "space-y-[24px]";
const labelStyle =
  "lg:text-[14px] font-[300] text-[#181818] leading-[18px] text-[12px]";

// Reusable Component for User Details Row
const UserDetailRow = ({ label, value }: any) => (
  <div className="flex space-x-1">
    <div className="w-1/2">
      <p className={commonTextStyle}>{label}</p>
    </div>
    <div className="w-1/2">
      <p className={boldTextStyle}>{value}</p>
    </div>
  </div>
);

const ProfileComponent = () => {
  const { userId }: { userId: string } = useParams();

  const { deactivating, onDeactivateUser } = useDeactivateUser();

  const handleDeactivate = () => {
    onDeactivateUser({
      email,
      userId,
      successCallback: () => {
        console.log("User successfully deactivated!");
        // Additional logic after successful deactivation (e.g., refetch data, redirect, etc.)
      },
    });
  };

  const { data, loading } = useGetUser({
    UserId: userId as string,
    initalFetch: true,
    successCallback: (message) => {
      console.log(message);
    },
    errorCallback: (error) => {
      console.error(error);
    },
  });

  // if (loading) return <div>Loading...</div>;
  if (!data) return <div>No user data found.</div>;

  const {
    email,
    first_name,
    last_name,
    profile_picture,
    address,
    date_created,
    mobile_nmumber,
    total_bookings,
    flight_bookings = [],
    car_bookings = [],
  } = data;

  return (
    <div className="space-y-[24px] w-full">
      {/* Back Button */}
      <div>
        <img src="/assets/icons/arrow-back.svg" alt="" />
      </div>

      {/* Profile Card */}
      <div className="bg-[#fff] rounded-[20px]">
        <div className="space-y-[40px] lg:p-[40px] p-[16px]">
          {loading ? (
            <div className="">
              <div className="bg-gray-300 rounded-[12px] animate-pulse h-[40px] w-[245px]"></div>
            </div>
          ) : (
            <div className="flex items-center lg:space-x-10 space-x-4">
              {[
                {
                  label: "Joined:",
                  value: date_created
                    ? format(new Date(date_created), "do MMMM, yyyy ")
                    : "N/A",
                },
                { label: "Last Edited:", value: "Never" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex space-x-[3px] flex-col lg:flex-row lg:items-center items-start"
                >
                  <span className={labelStyle}>{item.label}</span>
                  <span className="font-[600] text-[14px] text-[#181818]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* User Information */}
          <div className={sectionContainer}>
            <div className="space-y-6">
              <h1 className="font-[600] text-[16px] lg:text-[18px] text-[#181818]">
                User Information
              </h1>
              {loading ? (
                <div className="w-20 h-20 rounded-full animate-pulse bg-[#f5f5f5]"></div>
              ) : (
                <ProfilePictureT email={email} />
              )}
            </div>

            {loading ? (
              <LoadingUserData />
            ) : (
              <div className="space-y-6 w-full lg:w-[654px]">
                {[
                  { label: "First Name", value: first_name || "N/A" },
                  { label: "Last Name", value: last_name || "N/A" },
                  {
                    label: "Email Address",
                    value: email || "N/A",
                  },
                  { label: "Address", value: address || "---" },
                  { label: "Phone Number", value: mobile_nmumber || "---" },
                ].map((item, index) => (
                  <UserDetailRow
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Rewards and Loyalty Points */}
          {/* <div className={sectionContainer}>
            <h1 className={sectionHeading}>Rewards and Loyalty Points</h1>
            <div className="w-full lg:w-[496px] flex justify-between">
              {[
                { label: "Total", value: total_bookings || 0 },
                { label: "Flight", value: flight_bookings.length },
                { label: "Car", value: car_bookings.length },
              ].map((item, index) => (
                <div key={index} className="space-y-[12px]">
                  <p className="font-[500] text-[14px] lg:text-[16px] text-[#181818]">
                    {item.label}
                  </p>
                  <span className="font-[500] text-[14px] lg:text-[16px] text-[#181818]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Points Overview */}
          {/* <div className={sectionContainer}>
            <h1 className={sectionHeading}>Points Overview</h1>
            <div className="w-full lg:w-[665px] flex justify-between items-end">
              {[
                { label: "Total", value: `${total_bookings * 10 || 0} points` },
                { label: "Last Point Awarded", value: "58 points" },
                { label: "Date of Award", value: "04 Feb. ‘25" },
              ].map((item, index) => (
                <div key={index} className="space-y-[12px]">
                  <p className="font-[500] text-[14px] lg:text-[16px] text-[#181818]">
                    {item.label}
                  </p>
                  <span className="font-[500] text-[14px] lg:text-[16px] text-[#181818]">
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="space-y-[12px]">
                <p className="font-[500] text-[14px] lg:text-[16px] text-[#FF6F1E] cursor-pointer">
                  Upgrade
                </p>
              </div>
            </div>
          </div> */}

          <UserActivityTable userId={userId} />
        </div>
        <div className="h-[1px] w-full bg-[#F5F5F5]"></div>

        <div className="flex flex-col lg:flex-row lg:space-x-[24px] space-y-[24px] lg:space-y-0 lg:p-[40px] p-[16px]">
          {/* <Button
            variant="success"
            title="MANAGE USER REWARDS"
            full
            icon="/assets/icons/money.svg"
          /> */}
          <Button
            variant="light-red"
            title={deactivating ? "DEACTIVATING..." : "DEACTIVATE USER ACCOUNT"}
            full
            icon="/assets/icons/delete.svg"
            onClick={handleDeactivate}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

const ProfilePictureT = ({ email }: { email: string }) => {
  const firstLetter = email?.charAt(0)?.toUpperCase() || "?" || "";

  return (
    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#f5f5f5] text-[#181818] font-semibold text-[28px]">
      {firstLetter}
    </div>
  );
};

const LoadingUserData = () => {
  return (
    <div className="w-full space-y-[12px] px-6">
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[40px] w-[300px] "></div>
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[40px] w-[300px] "></div>
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[40px] w-[300px] "></div>
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[40px] w-[300px] "></div>
    </div>
  );
};

const BookingEmpty = () => {
  return <div className=""></div>;
};
export default page;
