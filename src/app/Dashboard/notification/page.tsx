"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  useGetAllNotifications,
  useMarkAsRead,
} from "@/hooks/api/notification";
import { format, formatDistanceToNow } from "date-fns";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  return (
    <div className="space-y-[24px]">
      <div>
        <img
          src="/assets/icons/arrow-back.svg"
          alt=""
          className="cursor-pointer"
          onClick={() => router.back()}
        />
      </div>
      <NotificationTable />
    </div>
  );
};

const NotificationTable = () => {
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "read" | "unread"
  >("all");
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );

  const {
    data,
    loading,
    refresh,
    goToNextPage,
    goToPreviousPage,
    filterByStatus,
  } = useGetAllNotifications({ initialParams: { status: "all" } });

  const { markAsRead, loading: marking } = useMarkAsRead();

  const toggleDropdown = () => setFilterDropdown((prev) => !prev);

  const handleSelect = (id: number) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === data.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(data.map((n) => n.id));
    }
  };

  const handleSingleMarkRead = (id: number) => {
    markAsRead([id], () => {
      refresh({ silent: true });
    });
  };

  const handleBulkMarkRead = () => {
    markAsRead(selectedNotifications, () => {
      setSelectedNotifications([]);
      refresh({ silent: true });
    });
  };

  return (
    <>
      <div className="border border-[#9B9EA4] rounded-[12px] overflow-hidden bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b py-[20px] px-[24px] bg-white">
          <div className="flex space-x-2 items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5"
              checked={
                selectedNotifications.length === data.length && data.length > 0
              }
              onChange={handleSelectAll}
            />
            <button
              onClick={() => refresh()}
              className="flex items-center space-x-2 p-[10px] border border-[#EBECED] rounded-[28px] text-sm font-medium text-[#181818] cursor-pointer"
            >
              <img src="/assets/icons/Refresh.svg" alt="" />
              <span>Refresh</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="flex border-[#ACAEB3] border rounded-[1000px] w-[306px] py-[10px] px-6 space-x-4">
              <img src="/assets/icons/search.svg" alt="" />
              <input
                type="text"
                placeholder="Search Notifications"
                className="text-sm w-full outline-none"
              />
            </div>

            {/* Date filter */}
            <div className="flex border-[#ACAEB3] border rounded-[1000px] py-[10px] px-6 space-x-4 cursor-pointer">
              <img src="/assets/icons/calendar.svg" alt="" />
              <span>Filter by Date</span>
            </div>

            {/* Status filter */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex border-[#ACAEB3] border rounded-[1000px] py-[10px] px-6 space-x-4 cursor-pointer items-center"
              >
                <span>
                  {selectedStatus === "all"
                    ? "All Notifications"
                    : selectedStatus === "read"
                    ? "Read"
                    : "Unread"}
                </span>
                {filterDropdown ? (
                  <ChevronUp className="ml-2 w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-2 w-4 h-4" />
                )}
              </button>
              {filterDropdown && (
                <div className="absolute top-10 right-0 w-40 bg-white border rounded-lg shadow-md z-10">
                  {["all", "read", "unread"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status as "all" | "read" | "unread");
                        filterByStatus(status as "all" | "read" | "unread");
                        setFilterDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => filterByStatus(selectedStatus)}
              className="px-4 py-2 text-[#023E8A] rounded-lg border border-[#023E8A] cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Bulk action buttons */}
        {selectedNotifications.length > 0 && (
          <div className="my-3 gap-3 flex items-center px-[24px]">
            <div className="bg-[#D72638] text-white cursor-pointer p-[10px] rounded-[28px] flex items-center space-x-2">
              <img src="/assets/icons/NotDel.svg" alt="" />
              <span className="text-[12px] font-[500]">Delete</span>
            </div>
            <div
              onClick={handleBulkMarkRead}
              className="border-[#EBECED] border cursor-pointer p-[10px] rounded-[28px] flex items-center space-x-2"
            >
              <span className="text-[12px] text-[#181818] font-[500]">
                {marking ? "Marking..." : "Mark as Read"}
              </span>
            </div>
          </div>
        )}

        {/* Notification list */}
        <div>
          {loading ? (
            <Skeleton />
          ) : (
            data.map((n) => (
              <div
                key={n.id}
                className={`flex items-start justify-between w-full px-[32px] py-3 cursor-pointer ${
                  n.is_read ? "bg-white" : "bg-[#CCD8E833]"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5"
                    checked={selectedNotifications.includes(n.id)}
                    onChange={() => handleSelect(n.id)}
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-[18px] font-[500] text-[#181818]">
                        {n.notification_type}
                      </p>
                    </div>
                    <p className="text-[16px] text-[#4E4F52] font-[400]">
                      {n.message}
                    </p>
                    <div className="flex items-center space-x-[4px]">
                      <p className="text-[13px] font-[500] text-[#181818]">
                        {format(new Date(n.created_at), "d/M/yyyy")}
                      </p>
                      <span className="w-[6px] h-[6px] rounded-full bg-[#9B9EA4]" />
                      <p className="text-[13px] font-[500] text-[#181818]">
                        {formatDistanceToNow(new Date(n.created_at), {
                          addSuffix: true,
                        })
                          .replace("about ", "")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </p>
                    </div>
                  </div>
                </div>

                {!n.is_read && (
                  <div
                    onClick={() => handleSingleMarkRead(n.id)}
                    className="bg-white cursor-pointer p-[10px] rounded-[4px]"
                  >
                    <span className="text-[14px] font-[500] text-[#181818]">
                      Mark As Read
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end space-x-5 mt-3">
        <div
          onClick={() => goToPreviousPage}
          className="border-[#9B9EA4] border rounded-[8px] p-[12px] text-[14px] text-[#9B9EA4] cursor-pointer"
        >
          Previous
        </div>
        <div
          onClick={() => goToNextPage}
          className="border-[#9B9EA4] border rounded-[8px] p-[12px] text-[14px] text-[#9B9EA4] cursor-pointer"
        >
          Next
        </div>
      </div>
    </>
  );
};

export default page;

const Skeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-start justify-between w-full px-[32px] py-3 cursor-pointer"
        >
          <div className="flex space-x-2">
            <div className="w-6 h-6 bg-[#a1adbc33] animate-pulse"></div>
            <div className="space-y-2">
              <div className="w-[300px] h-5 bg-[#a1adbc33] animate-pulse rounded-[4px]"></div>
              <div className="w-[200px] h-5 bg-[#a1adbc33] animate-pulse rounded-[4px]"></div>
              <div className="w-[100px] h-5 bg-[#a1adbc33] animate-pulse rounded-[4px]"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
