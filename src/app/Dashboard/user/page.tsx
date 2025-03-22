import Button from "@/components/reuseables/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <UserManagemntComponents />
    </div>
  );
};

const UserManagemntComponents = () => {
  return (
    <div className="space-y-[24px]">
      <Filter />
      <UsersTable />
    </div>
  );
};

const Filter = () => {
  return (
    <div className="space-y-[40px]">
      <div className="flex space-x-6 items-center ">
        <div className="flex-1 py-[8px] px-[16px] bg-[#FFFFFF] space-x-[16px] rounded-[1000px] flex ">
          <img src="/assets/icons/search.svg" alt="" className="" />
          <input
            type="text"
            className="flex-1 placeholder:text-[16px] placeholder:font-[400] text-[16px] placeholder:text-[#9B9EA4] text-[#181818] outline-none "
            placeholder="Search"
          />
          <div className="cursor-pointer flex space-x-[8px] p-[10px] bg-[#CCD8E8] rounded-[100px] items-center ">
            <img src="/assets/icons/filter-search.svg" alt="" className="" />
            <span className="text-[#023E8A] font-[600] text-[16px] ">
              Filter
            </span>
          </div>
        </div>

        <div className="h-10 bg-[#EBECED] w-[3px] "></div>

        <div className="py-[16px] px-[24px] bg-[#FFFFFF] space-x-[16px] rounded-[1000px] flex">
          <img src="/assets/icons/calendar.svg" alt="" className="" />

          <div className="flex items-center space-x-[4px] ">
            <span className="text-[14px] font-[400] text-[#181818] ">
              Filter by Date:{" "}
            </span>
            <span className="text-[14px] font-[400] text-[#9B9EA4] ">
              dd/mm/yyyy - dd/mm/yyyy
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex items-center space-x-4 ">
          <div className="space-x-4 flex items-center ">
            <div className="px-6 py-2 rounded-[1000px] bg-[#fff] cursor-pointer ">
              <span className="text-[14px] lg:text-[16px] font-[400] text-[#181818]">
                All
              </span>
            </div>
            <div className="px-6 py-2 rounded-[1000px] bg-[#023E8A] cursor-pointer">
              <span className="text-[14px] lg:text-[16px] font-[400] text-[#fff]">
                Flight Booking
              </span>
            </div>
            <div className="px-6 py-2 rounded-[1000px] bg-[#fff] cursor-pointer">
              <span className="text-[14px] lg:text-[16px] font-[400] text-[#181818]">
                Hotel Reservation
              </span>
            </div>
            <div className="px-6 py-2 rounded-[1000px] bg-[#fff] cursor-pointer">
              <span className="text-[14px] lg:text-[16px] font-[400] text-[#181818]">
                Car Rental
              </span>
            </div>
          </div>
          <div className="h-6 bg-[#EBECED] w-[3px] "></div>
          <div className="flex items-center space-x-2">
            <span className="font-[400] text-[14px] text-[#181818] ">
              Info per page:
            </span>
            <div className="px-6 py-2 rounded-[1000px] bg-[#fff] flex space-x-2 items-center ccursor-pointer">
              <span className="text-[14px] lg:text-[16px] font-[400] text-[#181818]">
                20
              </span>
              <img
                src="/assets/icons/chevron-down.svg"
                alt=""
                className="w-[16px] rotate-90 "
              />
            </div>
          </div>
        </div>

        <Button
          variant="orange-deep"
          title="Export as CSV file"
          icon="/assets/icons/down-orange.svg"
        />
      </div>
    </div>
  );
};

interface UserHistory {
  Name: string;
  Joined: string;
  Bookings: string;
  Points: string;
  Email: string;
  img: string;
}

const userHistoryData: UserHistory[] = [
  {
    Name: "Kemi Adeoti",
    Joined: "04 Feb. ‘25",
    Bookings: "25",
    Points: "2000",
    Email: "kemiadeoti@gmail.com",
    img: "/assets/images/profile-image.svg",
  },
  {
    Name: "Ayo Balogun",
    Joined: "12 Mar. ‘24",
    Bookings: "15",
    Points: "1200",
    Email: "ayobalogun@gmail.com",
    img: "/assets/images/profile-image.svg",
  },
  {
    Name: "Lola Akin",
    Joined: "18 Jan. ‘23",
    Bookings: "30",
    Points: "3000",
    Email: "lolaakin@gmail.com",
    img: "/assets/images/profile-image.svg",
  },
];

const UsersTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Joined</TableHead>
            <TableHead className="text-left hidden lg:table-cell">
              Bookings
            </TableHead>
            <TableHead className="text-left">Points</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="space-y-6">
          {userHistoryData.map((item, index) => (
            <TableRow key={`${item.Email}-${index}`} className="my-10" >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <img
                    src={item.img}
                    alt={item.Name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{item.Name}</span>
                </div>
              </TableCell>
              <TableCell>{item.Joined}</TableCell>
              <TableCell className="hidden lg:table-cell">
                {item.Bookings}
              </TableCell>
              <TableCell title={item.Points}>{item.Points}</TableCell>
              <TableCell>{item.Email}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <button className="text-blue-500 text-sm">
                    Download Receipt
                  </button>
                  <img
                    src="/assets/icons/chevron-down.svg"
                    alt="Chevron Down"
                    className="w-4"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
