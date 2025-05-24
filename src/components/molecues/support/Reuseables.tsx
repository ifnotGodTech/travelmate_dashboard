"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SuccessModal } from "@/components/reuseables/SuccessModal";
import { useRouter } from "next/navigation";
import DateRangeDialog from "@/components/reuseables/DateDialog";
import { parseISO, addDays, format, isValid } from "date-fns";
import { useClaimTicket } from "@/hooks/api/ticket";
import { useResolveTicket } from "@/hooks/api/ticket";
import { FilterDropdown } from "@/components/reuseables/FilterDropdown";
export const TableDropdown = ({
  parentWidth,
  onViewDetails,
  onViewMessage,
}: {
  parentWidth: number;
  onViewDetails?: () => void;
  onViewMessage?: () => void;
}) => {
  const options = [
    { label: "View Ticket Details", action: onViewDetails },
    { label: "Open Ticket Chat", action: onViewMessage },
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

export const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="space-y-2">
    <p className="text-[16px] font-[500] capitalize text-[#343537]">{label}</p>
    <span className="text-[14px] font-[400] text-[#343537]">{value}</span>
  </div>
);

export const TicketDetailsDialog = ({
  selectedTicket,
  ticketDetails,
  ticketLoading,
  onClose,
}: any) => {
  const name = `${ticketDetails?.user.first_name || "---"} ${
    ticketDetails?.user.last_name || "---"
  }`;
  const formattedDate = formatCreatedAt(ticketDetails?.created_at, 2);
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 ${
        selectedTicket ? "visible opacity-100" : "invisible opacity-0"
      } flex justify-end items-center transition-opacity duration-300`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-full max-w-[600px] lg:max-w-[720px] py-3 rounded-l-[20px] h-[90vh] ooverflow-y-auto shadow-lg transform border-[1px] border-[#9B9EA4] space-y-6 ${
          selectedTicket ? "scale-100" : "scale-95"
        } transition-transform duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b-[1px] w-full border-[#BCBEC2]">
          <h2 className="font-[600] text-[16px] lg:text-[28px] px-[16px] lg:px-[32px] py-[8px] text-[#181818]">
            Ticket Details
          </h2>
        </div>
        <div className="space-y-6">
          <div className="px-[16px] lg:px-[32px] space-y-6">
            <h2 className="text-[18px] font-[500] text-[#18181]">
              Ticket Information
            </h2>
            {ticketLoading ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-3 gap-6">
                <DetailRow label="Ticket ID" value={ticketDetails?.ticket_id} />
                <DetailRow label="Category" value={ticketDetails?.category} />
                <DetailRow label="Status" value={ticketDetails?.status} />
                <DetailRow label="Created at" value={formattedDate} />
              </div>
            )}
          </div>

          <div className="border-[#9B9EA4]  border-b-[1px]"></div>
          <div className="px-[16px] lg:px-[32px] space-y-3">
            <h2 className="text-[18px] font-[500] text-[#18181]">
              Customer Information
            </h2>
            <div className="space-y-4">
              {ticketLoading ? (
                <Loading />
              ) : (
                <>
                  <DetailRow label="Customer’s Name" value={name} />
                  <DetailRow
                    label="Customer’s Email"
                    value={ticketDetails?.user.email}
                  />
                </>
              )}
            </div>
          </div>
          <div className="border-[#9B9EA4]  border-b-[1px]"></div>
          <div className="px-[16px] lg:px-[32px] space-y-3">
            <h2 className="text-[18px] font-[500] text-[#18181]">
              Issue Description
            </h2>
            <div className="space-y-4">
              {ticketLoading ? (
                <Loading />
              ) : (
                <>
                  <DetailRow label="Customer’s Name" value={name} />
                  <DetailRow
                    label="Customer’s Email"
                    value={ticketDetails?.user.email}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <button
          className="absolute top-[16px] right-[16px] text-gray-500 cursor-pointer"
          onClick={onClose}
        >
          <img src="/assets/icons/modalClose.svg" alt="" className="w-[20px]" />
        </button>
      </div>
    </div>
  );
};

export const ViewingChatModal = ({
  selectedTicket,
  ticketDetails,
  ticketLoading,
  onClose,
}: any) => {
  const formattedDate = formatCreatedAt(ticketDetails?.created_at, 2);
  const router = useRouter();
  const { claiming, onClaiming } = useClaimTicket();

  const handleClaimTicket = () => {
    onClaiming({
      TicketId: ticketDetails?.id,
      successCallback: () => {
        router.push(`/Dashboard/support/ticket/${ticketDetails.id}/respond`);
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 ${
        selectedTicket ? "visible opacity-100" : "invisible opacity-0"
      } flex justify-center items-center transition-opacity duration-300`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-full max-w-[600px] lg:max-w-[720px] py-3 rounded-[20px] shadow-lg transform border-[1px] border-[#9B9EA4] space-y-6 ${
          selectedTicket ? "scale-100" : "scale-95"
        } transition-transform duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <>
          {ticketLoading ? (
            <div className="h-[300px] items-center flex justify-center ">
              <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {ticketDetails?.claimed_admin !== null ? (
                <>
                  <div className="border-b-[1px] w-full border-[#BCBEC2]">
                    <h2 className="font-[600] text-[16px] lg:text-[28px] px-[16px] lg:px-[32px] py-[8px] text-[#181818]">
                      Ticket Already claimed
                    </h2>
                  </div>

                  <div className=" px-[16px] lg:px-[32px]">
                    <p className="font-[400] text-[16px] lg:text-[20px]">
                      This chat is currently being handled by{" "}
                      {ticketDetails?.claimed_admin.first_name || "---"}. You
                      can either view the ticket or claim it. Claiming the
                      ticket will transfer responsibility to you, removing Elvis
                      from the conversation. The customer will be notified of
                      the change. Would you like to proceed?
                    </p>
                  </div>

                  <div className="mt-10 border-t-[1px] border-[#BCBEC2]">
                    <div className="px-[16px] lg:px-[32px] py-[10px] flex space-x-[24px] items-center justify-end ">
                      <div className="p-4 rounded-[8px] border-[1px] border-[#023E8A] justify-center flex items-center space-x-3 cursor-pointer">
                        <span className="text-[#023E8A] text-[20px] font-[500] ">
                          View Only
                        </span>
                      </div>

                      <div className="p-4 rounded-[8px] bg-[#023E8A] flex items-center space-x-3 justify-center cursor-pointer ">
                        <span className="text-[#fff] text-[20px] font-[500] ">
                          Yes, Proceed
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-b-[1px] w-full border-[#BCBEC2]">
                    <h2 className="font-[600] text-[16px] lg:text-[28px] px-[16px] lg:px-[32px] py-[8px] text-[#181818]">
                      Ticket {ticketDetails?.ticket_id}
                    </h2>
                  </div>

                  <div className="px-[16px] lg:px-[32px] grid grid-cols-3 gap-6">
                    <DetailRow label="Created at" value={formattedDate} />
                    <DetailRow
                      label="Category"
                      value={ticketDetails?.category}
                    />
                    <DetailRow label="Status" value={ticketDetails?.status} />
                    <DetailRow label="Subject" value={ticketDetails?.title} />
                  </div>

                  <div className="px-[16px] lg:px-[32px]">
                    <DetailRow
                      label="Description"
                      value={ticketDetails?.description}
                    />
                  </div>

                  <div className="mt-10 border-t-[1px] border-[#BCBEC2]">
                    <div className="px-[16px] lg:px-[32px] py-[10px] flex space-x-[40px] items-center">
                      <div className="p-4 rounded-[8px] border-[1px] w-full border-[#D72638] justify-center flex items-center space-x-3 cursor-pointer onClick ">
                        <img
                          src="/assets/icons/MessageModal.svg"
                          alt=""
                          className=""
                        />
                        <span
                          className="text-[#D72638] text-[20px] font-[500] "
                          onClick={() =>
                            router.push(
                              `/Dashboard/support/ticket/${ticketDetails.id}/escalate`
                            )
                          }
                        >
                          Escalate Ticket
                        </span>
                      </div>

                      <div
                        className="p-4 rounded-[8px] bg-[#023E8A] flex items-center space-x-3 w-full justify-center cursor-pointer "
                        onClick={handleClaimTicket}
                      >
                        {" "}
                        {claiming ? (
                          <div className="w-5 h-5 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <img
                              src="/assets/icons/ModalDanger.svg"
                              alt=""
                              className=""
                            />
                            <span className="text-[#fff] text-[20px] font-[500] ">
                              "Claim Ticket"
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>

        <button
          className="absolute top-[16px] right-[16px] text-gray-500 cursor-pointer"
          onClick={onClose}
        >
          <img src="/assets/icons/modalClose.svg" alt="" className="w-[16px]" />
        </button>
      </div>
    </div>
  );
};

export const formatCreatedAt = (isoDate: string, daysToAdd: number): string => {
  try {
    // Ensure the date is defined and valid
    if (!isoDate) throw new Error("Invalid date: undefined or empty string");

    const parsedDate = parseISO(isoDate);

    // Validate if the parsed date is valid
    if (!isValid(parsedDate)) throw new Error("Invalid ISO date string");

    // Add specified number of days
    const updatedDate = addDays(parsedDate, daysToAdd);

    // Format the date
    return format(updatedDate, "dd/MM/yyyy 'at' h:mm a");
  } catch (error) {
    return "Invalid date";
  }
};

const Loading = () => {
  return (
    <div className="w-full space-y-3 ">
      <div className="w-full h-8 bg-gray-300 rounded-[8px] animate-pulse"></div>
      <div className="w-full h-8 bg-gray-300 rounded-[8px] animate-pulse"></div>
      <div className="w-full h-8 bg-gray-300 rounded-[8px] animate-pulse"></div>
    </div>
  );
};

export const Filter = ({
  searchTerm,
  setSearchTerm,
  selectedOption,
  setSelectedOption,
}: any) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  // Format date for display
  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
        dateRange.to,
        "dd/MM/yyyy"
      )}`;
    }
    return "dd/mm/yyyy - dd/mm/yyyy";
  };
  return (
    <div className="">
      <div className="flex space-y-[12px] lg:space-y-0 space-x-[47px] justify-between flex-col lg:flex-row  items-center">
        {/* Search Bar */}
        <div className="w-full lg:py- py-[10px] px-[12px] lg:px-6 flex items-center border border-[#ACAEB3] rounded-full space-x-2">
          <img
            src="/assets/icons/search.svg"
            alt="Search Icon"
            className="w-4 h-4"
          />
          <input
            type="text"
            className="flex-1 text-[16px] placeholder:text-[#9B9EA4] text-[#181818] placeholder:font-light focus:outline-none placeholder:text-[16px] font-[400]"
            placeholder="Search by Name , Email or Ticket ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center space-x-3 w-full ">
          <FilterDropdown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            options={[
              { label: "All", value: "" },
              { label: "New", value: "new" },
              { label: "In Progress", value: "in_progress" },
              { label: "Resolved", value: "resolved" },
            ]}
          />

          {/* Date Filter - Now Clickable */}
          <div
            className="flex items-center lg:py-4 py-[6px] px-[8px] lg:px-[px] bg-white border lg:shadow-none shadow-sm border-[#EBECED] rounded-full space-x-1 cursor-pointer flex-1 "
            onClick={() => setDatePickerOpen(true)}
          >
            <img
              src="/assets/icons/calendar.svg"
              alt="Calendar Icon"
              className="w-6"
            />
            <div className="lg:flex items-center">
              <span className="text-[14px] font-light text-[#181818]">
                Filter by Date
              </span>
              <span className="text-[14px] font-light text-[#9B9EA4] hidden xl:block ">
                :{" "}
                {dateRange.from ? formatDateRange() : "dd/mm/yyyy - dd/mm/yyyy"}
              </span>
            </div>
          </div>
        </div>
        <div className=" text-[#023E8A] text-[14px] font-[400] p-3 border-[1px] border-[#023E8A] rounded-[8px] cursor-pointer ">
          Apply
        </div>
      </div>

      <DateRangeDialog
        isOpen={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
    </div>
  );
};

export const ConfirmResolution = ({
  selectedTicket,
  onClose,
  setShowModal,
}: {
  selectedTicket: any;
  onClose: () => void;
  setShowModal: (value: boolean) => void;
}) => {
  const { resolving, onResolveTicket } = useResolveTicket();

  const handleResolution = () => {
    if (!selectedTicket?.id) return;
    onResolveTicket({
      TicketId: selectedTicket.id,
      successCallback: () => {
        onClose();
        setShowModal(true);
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 flex justify-center items-center transition-opacity duration-300 ${
        selectedTicket ? "visible opacity-100" : "invisible opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-full max-w-[600px] lg:max-w-[720px] py-3 rounded-[20px] shadow-lg border border-[#9B9EA4] space-y-6 transition-transform duration-300 ${
          selectedTicket ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b w-full border-[#BCBEC2]">
          <h2 className="font-semibold text-[16px] lg:text-[28px] px-4 lg:px-8 py-2 text-[#181818]">
            Confirm Resolution
          </h2>
        </div>

        <div className="px-4 lg:px-8">
          <p className="font-normal text-[16px] lg:text-[20px]">
            Are you sure you want to mark this ticket as resolved? This will
            close the conversation with the customer, and they will be notified
            that their issue has been resolved.
          </p>
        </div>

        <div className="mt-10 border-t border-[#BCBEC2]">
          <div className="px-4 lg:px-8 py-4 flex space-x-6 items-center justify-end">
            <button
              className="p-4 rounded-lg border border-[#023E8A] text-[#023E8A] text-[16px] font-medium"
              onClick={onClose}
              disabled={resolving}
            >
              Cancel
            </button>

            <button
              className={`p-4 rounded-lg text-white text-[16px] font-medium ${
                resolving
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#023E8A] hover:bg-[#012D65]"
              }`}
              onClick={handleResolution}
              disabled={resolving}
            >
              {resolving ? (
                <div className="w-6 h-6 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Confirm Resolution"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
