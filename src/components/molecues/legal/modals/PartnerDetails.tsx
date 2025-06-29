import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { HistoryProps, Partners } from "@/app/Dashboard/cms/legal/page";

type PartnerDetailsProps = {
  showPartnerDetails: boolean;
  setShowPartnerDetails: (show: boolean) => void;
  partner: Partners | null;
  category: { id: number; name: string }[];
  formatSnakeToTitle: (data: string) => string;
  historyDetails: HistoryProps[];
};

const PartnerDetails = ({
  showPartnerDetails,
  setShowPartnerDetails,
  partner,
  category,
  formatSnakeToTitle,
  historyDetails,
}: PartnerDetailsProps) => {
  if (!partner) return null;
  const categoryName =
    category.find((cat) => cat.id === partner.category)?.name || "Unknown";

  const history = historyDetails?.find(
    (item) =>
      item.admin_full_name &&
      item.content_type === "partner" &&
      item.object_id === partner.id && // <-- Match specific partner
      item.action === "create"
  );

  return (
    <Dialog open={showPartnerDetails} onOpenChange={setShowPartnerDetails}>
      <DialogContent className="w-full lg:max-w-md max-w-smrounded-lg bg-white shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>

        <div className=" flex flex-col gap-3">
          <img
            src={
              typeof partner.logo === "string"
                ? partner.logo
                : "/assets/images/profile-image.svg"
            }
            alt="partner logo"
            className="w-20 h-20"
          />
          <div className="flex justify-between items-center w-full">
            <p>Name</p>
            <p className="text-black">{partner.name}</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p>Category</p>
            <p className="text-black">{formatSnakeToTitle(categoryName)}</p>
          </div>
          <div className="flex justify-between items-center w-full border-b-[1px] pb-6">
            <p>Uploaded by</p>
            <p className="text-black">
              {`${history?.admin_full_name} (${history?.admin_role})` ||
                "Unknown"}
            </p>
          </div>
          <div className="flex flex-col w-full">
            <p>Description</p>
            <p className="text-black">{partner.description || "Nil"}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerDetails;
