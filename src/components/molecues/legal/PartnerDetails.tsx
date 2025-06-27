import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Partner } from "./Partner";

type PartnerDetailsProps = {
  showPartnerDetails: boolean;
  setShowPartnerDetails: (show: boolean) => void;
  partner: Partner | null;
  category: { id: number; name: string }[];
  formatSnakeToTitle: (data: string) => string;
};

const PartnerDetails = ({
  showPartnerDetails,
  setShowPartnerDetails,
  partner,
  category,
  formatSnakeToTitle,
}: PartnerDetailsProps) => {
  if (!partner) return null;
  const categoryName =
    category.find((cat) => cat.id === partner.category)?.name || "Unknown";

  return (
    <Dialog open={showPartnerDetails} onOpenChange={setShowPartnerDetails}>
      <DialogContent className="w-full lg:max-w-md max-w-smrounded-lg bg-white shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        <DialogDescription className=" flex flex-col gap-3">
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
            <p className="text-black">Elvis Igbeibor (Admin)</p>
          </div>
          <div className="flex flex-col w-full">
            <p>Description</p>
            <p className="text-black">{partner.description || "Nil"}</p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerDetails;
