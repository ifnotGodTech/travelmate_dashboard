"use client";
import React from "react";
import Button from "@/components/reuseables/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full lg:min-w-[800px] p-[40px]">
        <div className="space-y-[40px] flex flex-col items-center">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-[500] text-[#181818]">
              Changes Successfully Updated
            </DialogTitle>
          </DialogHeader>

          <img
            src="/assets/icons/success-big.svg"
            alt="Success"
            className="w-20 h-20 my-6"
          />

          <DialogDescription className="lg:text-lg text-[14px] text-gray-700 text-center px-4 font-[500]">
            You have successfully edited and save changes
          </DialogDescription>

          <Link href="/Dashboard/cms" className="w-full">
            <Button 
              title="GO BACK TO DASHBOARD" 
              variant="blue" 
              full 
              onClick={onClose}
            />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;