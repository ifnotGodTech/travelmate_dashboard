"use client";
import { useState } from "react";
import { SuccessModal } from "@/components/reuseables/SuccessModal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useGetUser, useDeactivateUser } from "@/hooks/api/user";
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
    <p className="text-[12px] lg:text-[18px] font-[400] text-[#181818] ">
      {label}
    </p>
    <span className="text-[12px] lg:text-[18px] font-[500] lg:font-[600] text-[#181818]">
      {value}
    </span>
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
        <div className=" px-[16px] lg:px-[32px] py-[8px] ">
          <h2 className="font-[600] text-[16px] lg:text-[28px] text-[#181818] ">
            User Details
          </h2>
        </div>
        <div className="w-full border-b-[1px] border-[#9B9EA4] "></div>
        <div className="py-[19px] px-[16px] lg:px-[32px]">
          {userLoading ? (
            <LoadingUser />
          ) : userDetails ? (
            <div className="space-y-[28px]">
              <DetailRow label="USERID" value={userDetails.id}/>
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
                    userDetails.is_active
                      ? "bg-[#2D9C5E1A] text-green-700 border-[#2D9C5E]"
                      : "bg-[#D726380D] text-red-700 border-[#D72638]"
                  }`}
                >
                  {userDetails.is_active ? "Active" : "Deactivated"}
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
  const { deactivating, onDeactivateUser } = useDeactivateUser();
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [additionalNote, setAdditionalNote] = useState<string>("");
  const email = deactivatingUser?.email;

  const handleDeactivate = () => {
    onDeactivateUser({
      payload: {
        email,
        reason,
        additional_note: additionalNote,
      },
      userId: deactivatingUser?.id,
      successCallback: () => {
        onCancel();
        setShowModal(true);
      },
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onCancel}>
        <DialogContent className="lg:min-w-[800px] rounded-[16px] p-0 space-y-0">
          <DialogTitle></DialogTitle>
          <div className="px-[32px] py-[8px]">
            <h2 className="font-[600] text-[28px] text-[#181818]">
              Deactivate User Account
            </h2>
          </div>
          <div className="w-full border-b-[1px] border-[#9B9EA4]"></div>
          <div className="py-[19px] px-[32px] space-y-[16px]">
            <div className="space-y-4">
              <p className="text-[20px] font-[500] text-[#181818]">
                Deactivation Reason
              </p>

              <MiniDropdown
                options={[
                  { id: "1", label: "Suspicious account activity" },
                  { id: "2", label: "Multiple policy violations" },
                  { id: "3", label: "Fake or misleading profile information" },
                  { id: "4", label: "Multiple booking cancellations" },
                  { id: "5", label: "Fraudulent payment activity" },
                  { id: "6", label: "User reported by multiple hosts" },
                  { id: "7", label: "Terms of service violation" },
                ]}
                placeholder="Select"
                onSelect={(option) => setReason(option?.label || null)}
              />
            </div>
            <div className="space-y-3 w-full">
              <p className="text-[20px] font-[500] text-[#181818]">
                Additional Reason
              </p>

              <textarea
                rows={6}
                className="py-[16px] w-full px-[12px] rounded-[8px] border-[#818489] border-[1px] font-[400] text-[16px] text-[#181818] placeholder:font-[400] placeholder:text-[16px] placeholder:text-[#818489]"
                placeholder="Type here..."
                value={additionalNote}
                onChange={(e) => setAdditionalNote(e.target.value)}
              ></textarea>
            </div>

            <div className="bg-[#F5F5F5] rounded-[12px] p-4 flex space-x-[10px] items-start">
              <img src="/assets/icons/info.svg" alt="" />
              <span className="lg:text-[18px] text-[12px] font-[400] text-[#181818]">
                The selected reason as well as the additional reason will be
                sent to the user's email to inform them of their account
                deactivation.
              </span>
            </div>

            <div className="flex justify-end gap-4 w-full">
              <div
                className="border-[#023E8A] border-[1px] p-3 rounded-[8px] text-[#023E8A] font-[500] text-[16px] uppercase cursor-pointer"
                onClick={onCancel}
              >
                Cancel
              </div>
              <div
                className={`bg-[#D72638] p-3 rounded-[8px] text-[#fff] font-[500] text-[16px] uppercase ${
                  deactivatingUser?.is_active
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-25 "
                } `}
                onClick={handleDeactivate}
              >
                {deactivating ? "Deactivating user..." : "Confirm Deactivation"}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showModal && (
        <SuccessModal
          title="User Deactivated Successfully"
          description="You have successfully deactivated a user."
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

type MiniDropdownOption = {
  id: String;
  label: string;
};

type MiniDropdownProps = {
  options: MiniDropdownOption[];
  placeholder?: string;
  onSelect: (value: MiniDropdownOption | null) => void;
};

const MiniDropdown = ({
  options,
  placeholder,
  onSelect,
}: MiniDropdownProps) => {
  const [selectedOption, setSelectedOption] =
    useState<MiniDropdownOption | null>(null);

  const handleSelect = (option: MiniDropdownOption) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full p-4 rounded-[8px] border-[#818489] border-[1px] flex justify-between bg-transparent">
          {selectedOption?.label || placeholder}
          <img src="/assets/icons/arrow-down.svg" alt="Dropdown Arrow" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-popper-anchor-width)] min-w-[var(--radix-popper-anchor-width)]"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.label}
            className="w-full text-center px-4 py-2 hover:bg-gray-200"
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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
    { label: "Deactivate Account", action: onDeactivate },
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
              className="px-3 py-2 text-gray-700 hover:bg-gray-100"
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
