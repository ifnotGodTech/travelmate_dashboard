"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import Link from "next/link";
const page = () => {
  return (
    <div>
      <CmsContent />
    </div>
  );
};

interface UserHistory {
  Service: string;
  Fee: string;
  Rate: string;
  Description: string;
}

const serviceData: UserHistory[] = [
  {
    Service: "Flights",
    Fee: "Set by airline",
    Rate: "N200,000",
    Description: "Fee added to airline base fare",
  },
  {
    Service: "Hotels",
    Fee: "Set by hotel",
    Rate: "N20,000",
    Description: "Fee added to airline base fare",
  },
  {
    Service: "Cars",
    Fee: "Set by company",
    Rate: "N10,000",
    Description: "Fee added to airline base fare",
  },
];

const CmsContent = () => {
  const router = useRouter();
  return (
    <div className="p-4">
      <div className="space-y-6">
        <h1 className="text-[20px] font-[600] text-[#181818]">Services</h1>

        <div className="space-y-[40px]">
          <div className="">
            <Table className="w-full border border-gray-300 rounded-lg space-y- ">
              <TableHeader>
                <TableRow className="bg-[#fff]">
                  <TableHead>Service</TableHead>
                  <TableHead>Commission (%)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>Row {rowIndex + 1} - Col 1</TableCell>
                    <TableCell>Row {rowIndex + 1} - Col 2</TableCell>
                    <TableCell>
                      {" "}
                      <div
                        className="flex items-center space-x-2"
                        // onClick={() => {
                        //   if (item.Service === "Cars") {
                        //     router.push("/Dashboard/cms/change-rate/cars");
                        //   } else {
                        //     router.push("/Dashboard/cms/change-rate");
                        //   }
                        // }}
                      >
                        <img
                          src="/assets/icons/mode_edit.svg"
                          alt="Edit"
                          className="w-4 h-4 lg:w-5 lg:h-5"
                        />
                        <button className=" rounded-md  text-blue-700 font-semibold text-xs lg:text-sm hover:bg-blue-200 transition-all">
                          Edit
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* <Table className="min-w-full table-auto border border-gray-300 rounded-lg overflow-hidden">
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableCell className="w-1/3 text-left text-sm lg:text-base font-bold text-gray-700 py-3 px-4">
                  Service
                </TableCell>
                <TableCell className="w-1/3 text-left text-sm lg:text-base font-bold text-gray-700 py-3 px-4">
                  Commissions (%)
                </TableCell>
                <TableCell className="w-1/3 text-left text-sm lg:text-base font-bold text-gray-700 py-3 px-4">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceData.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 border-b border-gray-200 transition-colors"
                >
                  <TableCell className="py-3 px-4">
                    <span className="text-sm lg:text-base font-medium text-gray-800">
                      {item.Service}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <span className="text-sm lg:text-base text-gray-600">
                      0 (%)
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4">

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}

          <div className="w-full h-[1px] bg-[#EBECED] "></div>

          <div className="p-4">
            <div className="p-8 lg:p-10 lg:space-y-4 rounded-[8px] bg-[#CCD8E8] ">
              <h1 className="text-[16px] font-[500] text-[#023E8A] ">
                How Agency Rates Work
              </h1>

              <p className="text-[14px] lg:text-sm leading-[25px] font-[600] text-[#181818] ">
                These fees represent the markup your agency adds to the base
                fees charged by service providers. For example, if an airline
                charges N500,000 for a flight and your agency rate is N50,000,
                the customer will see N550,000 at their own end.
              </p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#EBECED] "></div>
          <div className="lg:px-12 py-3 cursor-pointer w-full bg-[#D5EBDF] rounded-lg text-center">
            <Link
              href="/Dashboard/cms/legal"
              className="uppercase text-[#2D9C5E]  w-full "
            >
              Go to Information Policies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
