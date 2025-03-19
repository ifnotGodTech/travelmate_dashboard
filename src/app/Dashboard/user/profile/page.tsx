import Button from "@/components/reuseables/Button";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <ProfileComponent />
    </div>
  );
};

const ProfileComponent = () => {
  return (
    <div className="space-y-[24px] w-full">
      <div className="">
        <img src="/assets/icons/arrow-back.svg" alt="" className="" />
      </div>
      <div className="bg-[#fff] rounded-[20px] ">
        <div className="space-y-[40px] lg:p-[40px] p-[16px] ">
          <div className="lg:space-x-10 space-x-4   flex items-center">
            <div className="flex space-x-[3px] flex-col lg:flex-row lg:items-center items-start ">
              <span className="lg:text-[14px] font-[300] text-[#181818] lg:leading-[100%] leading-[18px] text-[12px]">
                Joined:
              </span>
              <span className="font-[400] text-[14px] text-[#181818] ">
                6th February, 2025 | 08:43AM
              </span>
            </div>
            <div className="flex space-x-[3px] flex-col lg:flex-row lg:items-center items-start ">
              <span className="lg:text-[14px] font-[300] text-[#181818] lg:leading-[100%] leading-[18px] text-[12px]">
                Last Edited:
              </span>
              <span className="font-[400] text-[14px] text-[#181818] ">
                Never
              </span>
            </div>
          </div>

          <div className="space-y-[24px]">
            <div className="space-y-6">
              <h1 className=" font-[600] text-[16px] lg:text-[18px] lg:font-[500] text-[#181818] ">
                User Information
              </h1>

              <img
                src="/assets/images/profile-image.svg"
                alt=""
                className="w-[60px] lg:w-[80px]"
              />
            </div>

            <div className="space-y-6 w-full lg:w-[654px] ">
              <div className="flex space-x-1">
                <div className="w-1/2">
                  <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                    First Name
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                    Kemi
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-1/2">
                  <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                    Last Name
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                    Adeoti
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-1/2">
                  <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                    Residential Address
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                    12 Aliu Olaiya Avenue, Ikeja, Lagos State.
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-1/2">
                  <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                    Phone Number
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                    +234 8012 3456 789
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-1/2">
                  <p className="font-inter font-[400] text-[14px] leading-[100%] tracking-[0%] ">
                    Email Address
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="font-inter font-[500] text-[16px] leading-[100%] tracking-[0%] ">
                    kemiadeoti@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-[24px]">
            <h1 className=" font-[600] text-[14px] lg:text-[20px] lg:font-[500] text-[#181818] ">
              Rewards and Loyalty Points
            </h1>

            <div className=" w-full lg:w-[496px] flex justify-between">
              <div className="space-y-[12px]">
                <p className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818] ">
                  Total
                </p>
                <span className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818]">
                  20
                </span>
              </div>
              <div className="space-y-[12px]">
                <p className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818] ">
                  Flight
                </p>
                <span className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818]">
                  4
                </span>
              </div>
              <div className="space-y-[12px]">
                <p className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818] ">
                  Hotel
                </p>
                <span className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818]">
                  8
                </span>
              </div>
              <div className="space-y-[12px]">
                <p className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818] ">
                  Car
                </p>
                <span className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818]">
                  8
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-[24px]">
            <h1 className=" font-[600] text-[14px] lg:text-[20px] lg:font-[500] text-[#181818] ">
              Rewards and Loyalty Points
            </h1>

            <div className=" w-full lg:w-[665px] flex justify-between items-end ">
              <div className="space-y-[12px]">
                <p className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818] ">
                  Total
                </p>
                <span className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818]">
                  200 points
                </span>
              </div>
              <div className="space-y-[12px]">
                <p className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818] ">
                  Last Point Awarded
                </p>
                <span className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818]">
                  58 points
                </span>
              </div>
              <div className="space-y-[12px]">
                <p className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818] ">
                  Date of Award
                </p>
                <span className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#181818]">
                  04 Feb. ‘25
                </span>
              </div>
              <div className="space-y-[12px] items-baseline ">
                <p className="font-[500] text-[14px] lg:text-[16px] lg:font-[500] text-[#FF6F1E] cursor-pointer ">
                  Upgrade
                </p>
              </div>
            </div>
          </div>

          <UserActivityTable />
        </div>

        <div className="h-[1px] w-full bg-[#F5F5F5]"></div>

        <div className="flex flex-col lg:flex-row lg:space-x-[24px] space-x-0 space-y-[24px] lg:space-y-0 lg:p-[40px] p-[16px]  ">
          <Button
            variant="success"
            title="MANAGE USER REWARDS"
            full
            icon="/assets/icons/money.svg"
          />
          <Button
            variant="light-red"
            title="DEACTIVATE USER ACCOUNT"
            full
            icon="/assets/icons/delete.svg"
          />
        </div>
      </div>
    </div>
  );
};

interface UserHistory {
  id: string;
  date: string;
  amount: string;
  why: string;
  status: string;
}

const userHistoryData: UserHistory[] = [
  {
    id: "#117826",
    date: "04 Feb. ‘25",
    amount: "₦28,000",
    why: "Car Rental",
    status: "Pending",
  },
  {
    id: "#117826",
    date: "04 Feb. ‘25",
    amount: "₦28,000",
    why: "Hotel Rental",
    status: "Awarded",
  },
  {
    id: "#117826",
    date: "04 Feb. ‘25",
    amount: "₦28,000",
    why: "Flight",
    status: "Pending",
  },
];

const UserActivityTable: React.FC = () => {
  return (
    <div className="space-y-[24px]">
      <div className="flex justify-between">
        <h1 className="font-[600] text-[14px] lg:text-[20px] lg:font-[500] text-[#181818]">
          Booking History
        </h1>

        <div className="flex space-x-2 items-center cursor-pointer">
          <p className="font-[500] text-[12px] lg:text-[16px] lg:font-[500] text-[#FF6F1E] flex space-x-[4px]">
            <span>Export</span>
            <span className="hidden lg:block">full history</span>
          </p>
          <img
            src="/assets/icons/export.svg"
            alt="Export Icon"
            className="w-[16px] lg:w-[24px]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <tbody>
            {userHistoryData.map((item, index) => (
              <tr key={index}>
                <td className="py-[16px] w-full">
                  <div className="flex items-center space-x-[24px] w-full">
                    <span className="flex-1 text-[12px] lg:text-[16px] font-[400] text-[#181818] text-left">
                      {item.id}
                    </span>
                    <span className="flex-1 text-[12px] lg:text-[16px] font-[400] text-[#181818] text-left">
                      {item.date}
                    </span>
                    <span className="flex-1 text-[12px] lg:text-[16px] font-[400] text-[#181818] text-left hidden lg:block">
                      {item.amount}
                    </span>
                    <span
                      className="flex-1 text-[12px] lg:text-[16px] font-[400] text-[#181818] text-left truncate max-w-[80px] lg:max-w-none"
                      title={item.why} // Shows full text on hover
                    >
                      {item.why}
                    </span>

                    <span
                      className={`flex-1 text-[12px] lg:text-[16px] font-[600] ${
                        item.status === "Pending"
                          ? "text-[#FF6F1E]"
                          : "text-[#2D9C5E]"
                      } text-left`}
                    >
                      {item.status}
                    </span>

                    {/* Actions */}
                    <div className="flex  lg:flex-1 items-center space-x-[12px]">
                      <div className="flex items-center space-x-2 text-[#023E8A] cursor-pointer">
                        <p className="hidden lg:block text-[12px] lg:text-[14px]">
                          Download Receipt
                        </p>
                        <img
                          src="/assets/icons/download-2.svg"
                          alt="Download"
                          className="w-[16px] lg:w-[20px]"
                        />
                      </div>
                      <div className="cursor-pointer hidden lg:block">
                        <img
                          src="/assets/icons/chevron-down.svg"
                          alt="Chevron Down"
                          className="w-[16px] lg:w-[20px]"
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 ">
        <div className="bg-[#EBECED] cursor-pointer rounded-[8px] space-x-[16px] px-[40px] py-[16px] flex  items-center ">
          <p className="font-[400] text-[14px] text-[#023E8A] leading-[100%] ">
            Load more
          </p>
          <img src="/assets/icons/loader.svg" alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default page;
