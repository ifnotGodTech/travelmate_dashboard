"use client";
import { useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between">
    <p className="text-[18px] font-[400] text-[#181818] ">{label}</p>
    <span className="text-[18px] font-[600] text-[#181818]">{value}</span>
  </div>
);

export const UserDetailsDialog = ({
  selectedUser,
  userDetails,
  userLoading,
  onClose,
}: any) => {
  return (
    <Dialog open={Boolean(selectedUser)} onOpenChange={onClose}>
      <DialogContent className="lg:min-w-[800px] rounded-[16px] p-0 space-y-0 ">
        <DialogTitle></DialogTitle>
        <div className="px-[32px] py-[8px] ">
          <h2 className="font-[600] text-[28px] text-[#181818] ">
            User Details
          </h2>
        </div>
        <div className="w-full border-b-[1px] border-[#9B9EA4] "></div>
        <div className="py-[19px] px-[32px]">
          {userLoading ? (
            <p>Loading user details...</p>
          ) : userDetails ? (
            <div className="space-y-[28px]">
              <DetailRow label="USERID" value={userDetails.id} />
              <DetailRow
                label="Name"
                value={`${userDetails.first_name} ${userDetails.last_name}`}
              />
              <DetailRow label="Email" value={userDetails.email} />
              <DetailRow
                label="Registration Date"
                value={format(new Date(userDetails.date_created), "MM/dd/yyyy")}
              />
              <DetailRow
                label="Gender"
                value={userDetails.gender || "Not Available"}
              />
              <DetailRow
                label="Date Of Birth"
                value={userDetails.date_of_birth || "Not Available"}
              />
              <DetailRow
                label="Mobile Number"
                value={userDetails.mobile_number || "Not Available"}
              />
              <DetailRow
                label="Address"
                value={userDetails.address || "Not Available"}
              />

              <div className="flex justify-between">
                <p className="text-[18px] font-[400] text-[#181818] ">Status</p>
                <span
                  className={`p-[10px] border-[1px] rounded-[12px] text-[14px] uppercase font-[400] ${
                    userDetails.email
                      ? "bg-[#2D9C5E1A] text-green-700 border-[#2D9C5E]"
                      : "bg-[#D726380D] text-red-700 border-[#D72638]"
                  }`}
                >
                  {"Active"}
                </span>
              </div>
            </div>
          ) : (
            <p>No details available for this user.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const UserDeactivationDialog = ({
  deactivatingUser,
  isOpen,
  onConfirm,
  onCancel,
}: {
  deactivatingUser: any;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="lg:min-w-[800px] rounded-[16px] p-0 space-y-0 ">
        <DialogTitle></DialogTitle>
        <div className="px-[32px] py-[8px] ">
          <h2 className="font-[600] text-[28px] text-[#181818] ">
            Confirm Deletion
          </h2>
        </div>
        <div className="w-full border-b-[1px] border-[#9B9EA4]"></div>
        <div className="py-[19px] px-[32px] space-y-[16px]">
          <p className=" font-[400] text-[#4E4F52] text-[18px] ">
            You are about to permanently erase this user from the system. This
            account is currently in a deleted state, but this action will remove
            all remaining data permanently and cannot be undone. Are you sure
            you want to continue?
          </p>
        </div>
        <div className="w-full border-b-[1px] border-[#9B9EA4]"></div>
        <div className="flex justify-end  gap-4 w-full py-[19px] px-[32px]">
          <div className="border-[#023E8A] border-[1px] p-3 rounded-[8px] text-[#023E8A] font-[500] text-[16px] uppercase cursor-pointer ">
            Cancel
          </div>
          <div className="bg-[#D72638] p-3 rounded-[8px] text-[#fff] font-[500] text-[16px] uppercase cursor-pointer">
            Yes, Continue
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const UserDropdown = ({
  parentWidth,
  onViewDetails,
  onDeactivate,
}: {
  parentWidth: number;
  onViewDetails: () => void;
  onDeactivate: () => void;
}) => {
  const options = [
    { label: "View Details", action: onViewDetails },
    { label: "Delete", action: onDeactivate },
  ];

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="text-gray-500 hover:text-gray-700 cursor-pointer flex justify-center">
            <img src="/assets/icons/tableMenu.svg" alt="Menu" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="absolute z-10 mt-2 border border-gray-300 rounded-lg bg-white shadow-lg"
          style={{
            minWidth: "180px",
            maxWidth: parentWidth - 16,
            overflow: "hidden",
            left: "auto",
            right: 0,
          }}
        >
          {options.map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={option.action}
              className={`px-3 py-2 ${
                option.label === "Delete"
                  ? "text-red-600 hover:text-red-600 "
                  : "text-gray-700"
              } hover:bg-gray-100`}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const LoadingUser = () => {
  return (
    <div className="w-full space-y-[12px] px-6 py-[10px] ">
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[50px] w-ful"></div>
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[50px] w-ful"></div>
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[50px] w-ful"></div>
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[50px] w-ful"></div>
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[50px] w-ful"></div>
    </div>
  );
};
