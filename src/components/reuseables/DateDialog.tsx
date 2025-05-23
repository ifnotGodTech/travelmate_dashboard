import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

const DateRangeDialog = ({ isOpen, onClose, dateRange, setDateRange }: any) => {
  const handleClear = () => {
    setDateRange({ from: undefined, to: undefined });
    onClose();
  };

  const handleApply = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 rounded-lg shadow-lg lg:max-w-[600px] lg:w-[calc(100%-3rem)]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Select Date Range
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* From Date */}
            <div className="flex flex-col space-y-3 w-full">
              <label className="text-sm font-medium text-gray-700">
                From Date
              </label>
              <div>
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) =>
                    setDateRange((prev : any) => ({ ...prev, from: date }))
                  }
                  className="w-full"
                  disabled={(date) => dateRange.to && date > dateRange.to}
                />
              </div>
            </div>

            {/* To Date */}
            <div className="flex flex-col space-y-3 w-full">
              <label className="text-sm font-medium text-gray-700">
                To Date
              </label>
              <div>
                <Calendar
                  mode="single"
                  selected={dateRange.to}
                  onSelect={(date) =>
                    setDateRange((prev: any) => ({ ...prev, to: date }))
                  }
                  className="w-full"
                  disabled={(date) => dateRange.from && date < dateRange.from}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
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

export default DateRangeDialog;
