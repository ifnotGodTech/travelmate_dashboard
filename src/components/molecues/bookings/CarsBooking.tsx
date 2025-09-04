"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { BookingTableDropdown } from "./reuseables";

// Define the interface for filter props
interface FilterProps {
  searchTerm: string;
  selectedOption: string;
  selectedStartDate?: string;
  selectedEndDate?: string;
  selectedDate?: string;
  currency: string;
}

// Define the interface for component props
interface CarBookingTableProps {
  title: string;
  filterProps: FilterProps;
  bookings: any[];
  loading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

const CarBookingTable: React.FC<CarBookingTableProps> = ({ 
  title, 
  filterProps, 
  bookings = [],
  loading,
  onLoadMore,
  hasMore
}) => {
  const [activeSubTab, setActiveSubTab] = useState<string>("ongoing");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const styling =
    "h-full data-[state=active]:text-[#181818] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:border-b-[3px] data-[state=active]:border-b-[#181818] data-[state=active]:mb-0 flex items-center justify-center cursor-pointer bg-transparent shadow-none rounded-none text-[18px] text-[#4E4F52] font-[400] ";

  // Filter data based on active sub-tab only (search is handled by API endpoint)
  useEffect(() => {
    let filtered = [...bookings];

    // Filter by status based on active sub-tab
    filtered = filtered.filter((item) => {
      const status = item.booking_status?.toLowerCase();
      switch (activeSubTab) {
        case "ongoing":
          return status === "pending" || status === "confirmed";
        case "completed":
          return status === "completed";
        case "cancelled":
          return status === "cancelled";
        default:
          return true;
      }
    });

    setFilteredData(filtered);
  }, [bookings, activeSubTab]);

  // Format amount based on currency
  const formatAmount = (amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (filterProps.currency === "USD") {
      return `$${numAmount.toFixed(2)}`;
    }
    return `₦${(numAmount * 1500).toLocaleString()}`; // Convert EUR to NGN roughly
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  // Get status counts for tabs
  const getStatusCount = (status: string) => {
    switch (status) {
      case "ongoing":
        return bookings.filter(item => 
          item.booking_status?.toLowerCase() === "pending" || 
          item.booking_status?.toLowerCase() === "confirmed"
        ).length;
      case "completed":
        return bookings.filter(item => item.booking_status?.toLowerCase() === "completed").length;
      case "cancelled":
        return bookings.filter(item => item.booking_status?.toLowerCase() === "cancelled").length;
      default:
        return 0;
    }
  };

  // Get status styling
  const getStatusStyling = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "confirmed":
      case "paid":
        return "text-[#2D9C5E] border-[#2D9C5E] bg-[#2D9C5E1A]";
      case "cancelled":
      case "failed":
        return "text-[#E74C3C] border-[#E74C3C] bg-[#E74C3C1A]";
      case "pending":
      default:
        return "text-[#EFB608] border-[#EFB608] bg-[#EFB60833]";
    }
  };

  // Extract location name from coordinates (simplified)
  const formatLocation = (location: string) => {
    if (!location) return "N/A";
    if (location === "LOS") return "Lagos Airport";
    // If it contains coordinates, extract the first part
    if (location.includes("~")) {
      return location.split("~")[0] || "Unknown Location";
    }
    return location;
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg py-4">
      <h2 className="text-lg font-semibold px-4 mb-4">{title}</h2>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList className="flex space-x-6 items-center bg-transparent shadow-none rounded-none pb-0">
          <TabsTrigger value="ongoing" className={styling}>
            Ongoing ({getStatusCount("ongoing")})
          </TabsTrigger>
          <TabsTrigger value="completed" className={styling}>
            Completed ({getStatusCount("completed")})
          </TabsTrigger>
          <TabsTrigger value="cancelled" className={styling}>
            Cancelled ({getStatusCount("cancelled")})
          </TabsTrigger>
        </TabsList>

        <div className="overflow-x-auto border-t-[1px] border-[#4E4F52]">
          <Table className="border-none border-collapse min-w-[600px]">
            <TableHeader className="bg-[#f5f5f5]">
              <TableRow className="border-none">
                {[
                  "ID",
                  "Booking Reference",
                  "Passenger Name",
                  "Pick Up Location",
                  "Drop Off Location",
                  "Booked On",
                  "Transfer Type",
                  "Total Amount",
                  "Payment Status",
                  "Booking Status",
                  "Actions",
                ].map((header) => (
                  <TableCell
                    key={header}
                    className="font-[400] text-[#181818] text-[14px] py-5 px-4"
                    style={{ minWidth: "192.5px" }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="px-4">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    {Array.from({ length: 11 }).map((_, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        className="py-3 px-4"
                        style={{ minWidth: "192.5px" }}
                      >
                        <div className="animate-pulse bg-gray-200 h-4 rounded"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredData.length > 0 ? (
                <>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell
                        className="text-[14px] font-[400] text-[#181818] py-3 px-4"
                        style={{ minWidth: "192.5px" }}
                      >
                        {item.id ? String(item.id).substring(0, 8) + "..." : "N/A"}
                      </TableCell>
                      <TableCell
                        className="text-[14px] font-[400] text-[#181818] py-3 px-4"
                        style={{ minWidth: "192.5px" }}
                      >
                        {item.booking_reference || "N/A"}
                      </TableCell>
                      <TableCell
                        className="text-[14px] font-[400] text-[#181818] py-3 px-4"
                        style={{ minWidth: "192.5px" }}
                      >
                        {item.passenger_name || "N/A"}
                      </TableCell>
                      <TableCell
                        className="text-[14px] font-[400] text-[#181818] py-3 px-4"
                        style={{ minWidth: "192.5px" }}
                      >
                        {formatLocation(item.pickup_location)}
                      </TableCell>
                      <TableCell
                        className="text-[14px] font-[400] text-[#181818] py-3 px-4"
                        style={{ minWidth: "192.5px" }}
                      >
                        {formatLocation(item.dropoff_location)}
                      </TableCell>
                      <TableCell
                        className="text-[14px] font-[400] text-[#181818] py-3 px-4"
                        style={{ minWidth: "192.5px" }}
                      >
                        {item.date_booked ? formatDate(item.date_booked) : "N/A"}
                      </TableCell>
                      <TableCell
                        className="text-[14px] font-[400] text-[#181818] py-3 px-4"
                        style={{ minWidth: "192.5px" }}
                      >
                        {item.transfer_type === "N/A" ? "Standard" : item.transfer_type || "Standard"}
                      </TableCell>
                      <TableCell
                        className="py-5 px-4 text-gray-800"
                        style={{ minWidth: "192.5px" }}
                      >
                        {item.total_amount ? formatAmount(item.total_amount) : "N/A"}
                      </TableCell>
                      <TableCell
                        className="py-5 px-4"
                        style={{ minWidth: "192.5px" }}
                      >
                        <div
                          className={`border-[1px] rounded-[12px] text-[14px] font-[400] p-[10px] w-fit ${getStatusStyling(item.payment_status)}`}
                        >
                          {item.payment_status || "PENDING"}
                        </div>
                      </TableCell>
                      <TableCell
                        className="py-3 px-4"
                        style={{ minWidth: "192.5px" }}
                      >
                        <div
                          className={`border-[1px] rounded-[12px] text-[14px] font-[400] p-[10px] w-fit ${getStatusStyling(item.booking_status)}`}
                        >
                          {item.booking_status || "PENDING"}
                        </div>
                      </TableCell>
                      <TableCell
                        className="py-3 px-4 cursor-pointer"
                        style={{ minWidth: "192.5px" }}
                      >
                        <BookingTableDropdown />
                      </TableCell>
                    </TableRow>
                  ))}
                  {hasMore && !loading && (
                    <TableRow>
                      <TableCell
                        colSpan={11}
                        className="text-center py-4"
                      >
                        <button
                          onClick={onLoadMore}
                          disabled={loading}
                          className="px-4 py-2 bg-[#023E8A] text-white rounded hover:bg-[#023E8A]/90 disabled:opacity-50"
                        >
                          Load More
                        </button>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={11}
                    className="text-center py-8 text-[#4E4F52]"
                  >
                    No bookings found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Tabs>
    </div>
  );
};

export default CarBookingTable;