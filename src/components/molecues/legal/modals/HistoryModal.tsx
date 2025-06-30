import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { HistoryProps } from "@/app/Dashboard/cms/legal/page";
type Props = {
  showHistoryModal?: boolean;
  onClose?: () => void;
  historyDetails?: HistoryProps[];
  activeTab?: string;
};

const HistoryModal = ({
  showHistoryModal,
  onClose,
  historyDetails,
  activeTab,
}: Props) => {
  const formatSnakeToTitle = (value: string): string => {
    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const filterHistory =
    historyDetails?.filter((item) => item.content_type === activeTab) || [];

  return (
    <>
      <Dialog open={showHistoryModal} onOpenChange={onClose}>
        <DialogContent className="max-w-xl p-8 rounded-lg bg-white shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block z-[99]">
          <DialogHeader className="text-justify">
            <DialogTitle className="text-xl font-bold text-[#181818]  text-justify capitalize">
              {`History - ${formatSnakeToTitle(
                historyDetails?.find((item) => item.content_type === activeTab)
                  ?.content_type || "Unknown"
              )}
            `}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-row justify-between items-center w-full lg:block lg:border-[1px] rounded-lg bg-[#F5F5F5] lg:bg-transparent">
            <div className="flex lg:flex-row flex-col gap-3 justify-between lg:items-center  w-full lg:border-b-[1px] p-2 font-semibold">
              <p>Updated By</p>
              <p>Role</p>
              <p>Date</p>
            </div>
            {filterHistory.length > 0 ? (
              filterHistory?.map((item, index) => (
                <div
                  key={index}
                  className="flex  lg:flex-row flex-col gap-3 justify-between lg:items-center  w-full p-2"
                >
                  <p>{item.admin_full_name || "--- ---"}</p>
                  <p>{item.admin_role || "------"}</p>
                  <p>{new Date(item.timestamp).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center">Nothing to see here</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showHistoryModal} onOpenChange={onClose} >
        <DialogContent className="w-full lg:max-w-xl  lg:p-8 rounded-lg bg-white shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block lg:hidden">
          <DialogHeader className="text-justify">
            <DialogTitle className="text-xl font-bold text-[#181818]  text-justify capitalize">
              {`History - ${formatSnakeToTitle(
                historyDetails?.find((item) => item.content_type === activeTab)
                  ?.content_type || "Unknown"
              )}
            `}
            </DialogTitle>
          </DialogHeader>
          <div className="">
            {filterHistory.length > 0 ? (
              filterHistory?.map((item, index) => (
                <div className="flex  items-center bg-[#F5F5F5] gap-2 mt-4 rounded-lg p-2" key={index}>
                  <div className="flex lg:flex-row flex-col gap-1 justify-between lg:items-center  w-full lg:border-b-[1px] p-2 font-semibold">
                    <p>Updated By</p>
                    <p>Role</p>
                    <p>Date</p>
                  </div>
                  <div
                    className="flex  lg:flex-row flex-col gap-3 justify-between lg:items-center  w-full p-2"
                  >
                    <p>{item.admin_full_name || "--- ---"}</p>
                    <p>{item.admin_role || "------"}</p>
                    <p>{new Date(item.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center">Nothing to see here</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HistoryModal;
