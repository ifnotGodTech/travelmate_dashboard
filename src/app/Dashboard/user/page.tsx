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

const page = () => {
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
      <div className="flex space-x-4 lg:space-x-2 items-center">
        {/* Search Bar */}
        <div className="lg:flex-1 w-[286px] lg:w-full py-2 px-4 bg-white flex items-center border border-[#EBECED] rounded-full space-x-2">
          <img
            src="/assets/icons/search.svg"
            alt="Search Icon"
            className="w-4 h-4"
          />
          <input
            type="text"
            className="flex-1 text-[14px] placeholder:text-[#9B9EA4] text-[#181818] placeholder:font-light focus:outline-none"
            placeholder="Search"
          />
          <button className="flex items-center space-x-1 bg-[#023E8A] text-white text-sm font-semibold py-1 px-3 rounded-full">
            <img
              src="/assets/icons/filter-search.svg"
              alt="Filter Icon"
              className="w-4 h-4"
            />
            <span>Filter</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-10 bg-[#EBECED] w-[2px] hidden lg:block"></div>

        {/* Date Filter */}
        <div className="flex items-center py-2 px-2 bg-white border border-[#EBECED] rounded-full space-x-2">
          <img
            src="/assets/icons/calendar.svg"
            alt="Calendar Icon"
            className="w-4 h-4"
          />
          <div className="hidden lg:flex items-center space-x-1">
            <span className="text-[14px] font-light text-[#181818]">
              Filter by Date:
            </span>
            <span className="text-[14px] font-light text-[#9B9EA4]">
              dd/mm/yyyy - dd/mm/yyyy
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 ">
          <div className="space-x-4 flex items-center ">
            <div className="px-6 py-2 rounded-[1000px] bg-[#fff] cursor-pointer border-[#EBECED] border-[1px] lg:border-0  ">
              <span className="text-[14px] lg:text-[16px] font-[400] text-[#181818]  ">
                All
              </span>
            </div>
            <div className="px-6 py-2 rounded-[1000px] bg-[#023E8A] cursor-pointer">
              <span className="text-[14px] lg:text-[16px] font-[400] text-[#fff] block lg:hidden">
                Flight
              </span>
              <span className="text-[14px] lg:text-[16px] font-[400] text-[#fff] hidden lg:block ">
                Flight Booking
              </span>
            </div>
            <div className="px-6 py-2 rounded-[1000px] bg-[#fff] cursor-pointer border-[#EBECED] border-[1px] lg:border-0  ">
              <span className="text-[14px] lg:text-[16px] font-[400] text-[#181818] block lg:hidden">
                Hotel
              </span>
              <span className="text-[14px] lg:text-[16px] font-[400] text-[#181818] hidden lg:block">
                Hotel Reservation
              </span>
            </div>
            <div className="px-6 py-2 rounded-[1000px] bg-[#fff] cursor-pointer hidden lg:block border-[#EBECED] border-[1px] lg:border-0   ">
              <span className="text-[14px] lg:text-[16px] font-[400] text-[#181818] block lg:hidden ">
                Car
              </span>
              <span className="text-[14px] lg:text-[16px] font-[400] text-[#181818] hidden lg:block ">
                Car Rental
              </span>
            </div>
          </div>
          <div className="h-6 bg-[#EBECED] w-[3px] hidden   "></div>
          <div className="lg:flex items-center space-x-2  hidden ">
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

        <div className="lg:hidden">
          <div className="py-4 px-6 rounded-[8px] bg-[#FF6F1E]">
            <img src="/assets/icons/down-orange.svg" alt="" className="" />
          </div>
        </div>

        <div className="hidden lg:block ">
          <Button
            variant="orange-deep"
            title="Export as CSV file"
            icon="/assets/icons/down-orange.svg"
            responsiveHideText
          />
        </div>
      </div>
    </div>
  );
};

interface UserHistory {
  id: string;
  Name: string;
  Joined: string;
  bookings: string;
  point: string;
  email: string;
  profileImg: string;
}

const userHistoryData: UserHistory[] = [
  {
    id: "1",
    Name: "Kemi Adeoti",
    Joined: "04 Feb. ‘25",
    bookings: "25",
    point: "2000",
    email: "kemiadeoti@gmail.com",
    profileImg: "/assets/images/profile-image.svg",
  },
  {
    id: "2",
    Name: "Kemi Adeoti",
    Joined: "04 Feb. ‘25",
    bookings: "25",
    point: "2000",
    email: "kemiadeoti@gmail.com",
    profileImg: "/assets/images/profile-image.svg",
  },
  {
    id: "3",
    Name: "John doe",
    Joined: "04 Feb. ‘25",
    bookings: "25",
    point: "2000",
    email: "kemiadeoti@gmail.com",
    profileImg: "/assets/images/nav-user.svg",
  },
];

const UsersTable: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="py-3 px-4 text-sm lg:text-base font-semibold text-neutral-900">
                Name
              </TableHead>
              <TableHead className="py-3 px-4 text-sm lg:text-base font-semibold text-neutral-900">
                Joined
              </TableHead>
              <TableHead className="py-3 px-4 text-sm lg:text-base font-semibold text-neutral-900 hidden lg:table-cell">
                Total Bookings
              </TableHead>
              <TableHead className="py-3 px-4 text-sm lg:text-base font-semibold text-neutral-900 hidden lg:table-cell">
                Loyalty Points
              </TableHead>
              <TableHead className="py-3 px-4 text-sm lg:text-base font-semibold text-neutral-900 hidden lg:table-cell">
                Email Address
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userHistoryData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="py-4 px-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.profileImg}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-sm lg:text-base font-normal text-neutral-900">
                      {item.Name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-4 text-sm lg:text-base font-normal text-neutral-900">
                  {item.Joined}
                </TableCell>
                <TableCell className="py-4 px-4 text-sm lg:text-base font-normal text-neutral-900 hidden lg:table-cell">
                  {item.bookings}
                </TableCell>
                <TableCell
                  className="py-4 px-4 text-sm lg:text-base font-normal text-neutral-900 truncate max-w-[80px] lg:max-w-none hidden lg:table-cell"
                  title={item.point.toString()}
                >
                  {item.point}
                </TableCell>
                <TableCell className="py-4 px-4 text-sm lg:text-base font-normal text-neutral-900 hidden lg:table-cell">
                  {item.email}
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <img
                      src="/assets/icons/chevron-down.svg"
                      alt="Chevron Down"
                      className="w-4 lg:w-5"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-gray-200 hover:bg-gray-300 text-blue-700 rounded-md px-10 py-4 flex items-center space-x-4">
          <span className="text-sm">Load more</span>
          <img src="/assets/icons/loader.svg" alt="Loader" />
        </button>
      </div>
    </div>
  );
};

export default page;
