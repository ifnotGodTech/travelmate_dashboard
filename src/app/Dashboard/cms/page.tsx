import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/reuseables/Button";

type Props = {};

const page = (props: Props) => {
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

const userHistoryData: UserHistory[] = [
  {
    Service: "Flights",
    Fee: "Set by airline",
    Rate: "N200,000",
    Description: "Fee added to airline base fare",
  },
];

const CmsContent = () => {
  return (
    <div className="space-y-6">
      <div className="">
        <h1 className="text-[20px] font-[600] text-[#181818]"></h1>

        <div className="rounded-[20px] gap-[40px] p-6 bg-[#fff]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Service Type</TableHead>
                <TableHead className="text-left">Base Fee</TableHead>

                <TableHead className="text-left">Agency Rate</TableHead>
                <TableHead className="text-left hidden lg:table-cell">
                  Description
                </TableHead>
                <TableHead className="text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="space-y-6">
              {userHistoryData.map((item, index) => (
                <TableRow className="my-10">
                  <TableCell>{item.Service}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {item.Fee}
                  </TableCell>
                  <TableCell>{item.Rate}</TableCell>
                  <TableCell>{item.Description}</TableCell>
                  <TableCell>
                    <Button title="Edit" variant="blue" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default page;
