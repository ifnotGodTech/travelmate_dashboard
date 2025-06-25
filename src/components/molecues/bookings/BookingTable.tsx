"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { BookingTableDropdown } from "./reuseables";

const dummyData = [
  {
    id: "BK-001",
    property: "Maison Fahrenheit Hotel",
    guest: "John Doe",
    bookedOn: "25/5/2025",
    checkInCheckOut: "26/5/2025 - 30/5/2025",
    nights: 5,
    roomType: "Standard King Room",
    type: "Hotel",
    totalAmount: "₦80,000",
    paymentStatus: "Paid",
    bookingStatus: "Cancellation Requested",
  },
  {
    id: "BK-002",
    property: "Maison Fahrenheit Hotel",
    guest: "John Doe",
    bookedOn: "25/5/2025",
    checkInCheckOut: "26/5/2025 - 30/5/2025",
    nights: 5,
    roomType: "Standard King Room",
    type: "Hotel",
    totalAmount: "₦80,000",
    paymentStatus: "Paid",
    bookingStatus: "Cancellation Requested",
  },
  {
    id: "BK-003",
    property: "Maison Fahrenheit Hotel",
    guest: "John Doe",
    bookedOn: "25/5/2025",
    checkInCheckOut: "26/5/2025 - 30/5/2025",
    nights: 5,
    roomType: "Standard King Room",
    type: "Hotel",
    totalAmount: "₦80,000",
    paymentStatus: "Pending",
    bookingStatus: "Pending",
  },
  {
    id: "BK-004",
    property: "Maison Fahrenheit Hotel",
    guest: "John Doe",
    bookedOn: "25/5/2025",
    checkInCheckOut: "26/5/2025 - 30/5/2025",
    nights: 5,
    roomType: "Standard King Room",
    type: "Hotel",
    totalAmount: "₦80,000",
    paymentStatus: "Pending",
    bookingStatus: "Pending",
  },
  {
    id: "BK-005",
    property: "Maison Fahrenheit Hotel",
    guest: "John Doe",
    bookedOn: "25/5/2025",
    checkInCheckOut: "26/5/2025 - 30/5/2025",
    nights: 5,
    roomType: "Standard King Room",
    type: "Hotel",
    totalAmount: "₦80,000",
    paymentStatus: "Paid",
    bookingStatus: "Cancellation Requested",
  },
  {
    id: "BK-006",
    property: "Maison Fahrenheit Hotel",
    guest: "John Doe",
    bookedOn: "25/5/2025",
    checkInCheckOut: "26/5/2025 - 30/5/2025",
    nights: 5,
    roomType: "Standard King Room",
    type: "Hotel",
    totalAmount: "₦80,000",
    paymentStatus: "Paid",
    bookingStatus: "Cancellation Requested",
  },
  {
    id: "BK-007",
    property: "Maison Fahrenheit Hotel",
    guest: "John Doe",
    bookedOn: "25/5/2025",
    checkInCheckOut: "26/5/2025 - 30/5/2025",
    nights: 5,
    roomType: "Standard King Room",
    type: "Hotel",
    totalAmount: "₦80,000",
    paymentStatus: "Pending",
    bookingStatus: "Pending",
  },
  {
    id: "BK-009",
    property: "Maison Fahrenheit Hotel",
    guest: "John Doe",
    bookedOn: "25/5/2025",
    checkInCheckOut: "26/5/2025 - 30/5/2025",
    nights: 5,
    roomType: "Standard King Room",
    type: "Hotel",
    totalAmount: "₦80,000",
    paymentStatus: "Pending",
    bookingStatus: "Pending",
  },
];

const BookingTable = () => {
  const styling =
    "h-full data-[state=active]:text-[#181818] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:border-b-[2px] data-[state=active]:border-b-[#181818] flex items-center justify-center cursor-pointer bg-transparent shadow-none rounded-none text-[18px] text-[#4E4F52] font-[400] ";

  return (
    <div className="bg-white border border-gray-300 rounded-lg py-4">
      <h2 className="text-lg font-semibold px-4 mb-4 ">All Stays</h2>

      <Tabs className="">
        <TabsList className="flex space-x-6 items-center bg-transparent shadow-none rounded-none pb-0">
          <TabsTrigger value="ongoing" className={styling}>
            Ongoing
          </TabsTrigger>
          <TabsTrigger value="completed" className={styling}>
            Completed
          </TabsTrigger>
          <TabsTrigger value="cancelled" className={styling}>
            Cancelled
          </TabsTrigger>
        </TabsList>

        {/* <div className="w-full border-b-[1px] border-[#4E4F52] "></div> */}

        <div className="overflow-x-auto border-t-[1px] border-[#4E4F52] ">
          <Table className="border-none border-collapse min-w-[600px]">
            <TableHeader className="bg-[#f5f5f5]">
              <TableRow className="border-none">
                {[
                  "ID",
                  "Property",
                  "Guest",
                  "Booked On",
                  "Check-In - Check-Out",
                  "Room Type",
                  "Type",
                  "Total Amount",
                  "Payment Status",
                  "Booking Status",
                  "Actions",
                ].map((header) => (
                  <TableCell
                    key={header}
                    className="font-[400] text-[#181818] text-[14px]  py-5 px-4"
                    style={{ minWidth: "192.5px" }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="px-4 ">
              {dummyData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell
                    className=" text-[14px] font-[400] text-[#181818] py-3 px-4"
                    style={{ minWidth: "192.5px" }}
                  >
                    {item.id}
                  </TableCell>
                  <TableCell
                    className=" text-[14px] font-[400] text-[#181818] py-3 px-4"
                    style={{ minWidth: "192.5px" }}
                  >
                    {item.property}
                  </TableCell>
                  <TableCell
                    className=" text-[14px] font-[400] text-[#181818] py-3 px-4"
                    style={{ minWidth: "192.5px" }}
                  >
                    {item.guest}
                  </TableCell>
                  <TableCell
                    className=" text-[14px] font-[400] text-[#181818] py-3 px-4"
                    style={{ minWidth: "192.5px" }}
                  >
                    {item.bookedOn}
                  </TableCell>
                  <TableCell
                    className=" text-[14px] font-[400] text-[#181818] py-3 px-4"
                    style={{ minWidth: "192.5px" }}
                  >
                    {item.checkInCheckOut}
                  </TableCell>
                  <TableCell
                    className=" text-[14px] font-[400] text-[#181818] py-3 px-4"
                    style={{ minWidth: "192.5px" }}
                  >
                    {item.roomType}
                  </TableCell>
                  <TableCell
                    className=" text-[14px] font-[400] text-[#181818] py-3 px-4"
                    style={{ minWidth: "192.5px" }}
                  >
                    {item.type}
                  </TableCell>
                  <TableCell
                    className="py-5 px-4 text-gray-800"
                    style={{ minWidth: "192.5px" }}
                  >
                    {item.totalAmount}
                  </TableCell>
                  <TableCell
                    className="py-5 px-4"
                    style={{ minWidth: "192.5px" }}
                  >
                    <div
                      className={`border-[1px] rounded-[12px] text-[14px] font-[400] bg-[#2D9C5E1A] p-[10px] w-fit ${
                        item.paymentStatus === "Paid"
                          ? "text-[#2D9C5E] border-[#2D9C5E] bg-[#2D9C5E1A] "
                          : "text-[#EFB608] border-[#EFB608] bg-[#EFB60833]"
                      }`}
                    >
                      {item.paymentStatus}
                    </div>
                  </TableCell>
                  <TableCell
                    className="py-3 px-4"
                    style={{ minWidth: "192.5px" }}
                  >
                    <div
                      className={`border-[1px] rounded-[12px] text-[14px] font-[400] bg-[#2D9C5E1A] p-[10px] w-fit ${
                        item.bookingStatus === "Cancellation Requested"
                          ? "text-[#2D9C5E] border-[#2D9C5E] bg-[#2D9C5E1A] "
                          : "text-[#EFB608] border-[#EFB608] bg-[#EFB60833]"
                      }`}
                    >
                      {item.bookingStatus}
                    </div>
                  </TableCell>
                  <TableCell
                    className=" py-3 px-4 cursor-pointer"
                    style={{ minWidth: "192.5px" }}
                  >
                    <BookingTableDropdown />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Tabs>
    </div>
  );
};

export default BookingTable;
