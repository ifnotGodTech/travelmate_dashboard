"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const DateDialog = ({
  isOpen,
  onClose,
  selectedDate,
  setSelectedDate,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string | undefined;
  setSelectedDate: (date: string | undefined) => void;
}) => {
  const [internalDate, setInternalDate] = useState<Date>(new Date());

  // Sync internal date with selectedDate when dialog opens
  useEffect(() => {
    if (isOpen && selectedDate) {
      const parsedDate = new Date(selectedDate);
      if (!isNaN(parsedDate.getTime())) {
        setInternalDate(parsedDate);
      }
    }
  }, [isOpen, selectedDate]);

  const handleClear = () => {
    setSelectedDate(undefined);
    onClose();
  };

  const handleApply = () => {
    if (internalDate) {
      const formattedDate = format(internalDate, "dd-MM-yyyy");
      setSelectedDate(formattedDate);
      console.log("Formatted Date:", formattedDate);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800 text-center">
            Select a Date
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-between h-full mt-4">
          {/* Calendar */}
          <div className="flex-grow">
            <Calendar
              mode="single"
              selected={internalDate} // Set the initial date
              onSelect={(date: Date) => {
                if (date) {
                  setInternalDate(date); // Update internal date
                }
              }}
              className="w-full h-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6 w-full">
            <button
              className="px-4 py-2 border rounded-lg text-gray-600 bg-gray-50 hover:bg-gray-100 transition"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              className="px-4 py-2 rounded-lg text-white bg-[#023E8A] hover:bg-[#025dbf] transition"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DateDialog;
