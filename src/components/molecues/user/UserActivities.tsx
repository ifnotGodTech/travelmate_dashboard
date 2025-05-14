"use client";
import { useUserBookings } from "@/hooks/api/user";
import { format } from "date-fns";

export const UserActivityTable = ({ userId }: any) => {
  const { bookings, isLoading, error } = useUserBookings(userId);
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

      {isLoading ? (
        <LoadingUser />
      ) : (
        <div className="overflow-x-auto">
          {bookings.length == 0 ? (
            <div className="flex justify-center w-full">
              <h1 className="text-[#181818] text-[28px] font-[500]  ">
                This User has no Booking
              </h1>
            </div>
          ) : (
            <table className="w-full border-collapse table-fixed">
              <tbody>
                {bookings.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 cursor-pointer  rounded-[8px] "
                  >
                    <td className="py-[16px] w-full px-4  ">
                      <div className="flex items-center space-x-[18px] w-full">
                        <span className="flex-1 text-[12px] lg:text-[16px] font-[500] text-[#181818] text-left">
                          #{item.specific_id}
                        </span>
                        <span className="flex-1 text-[12px] lg:text-[16px] font-[500] text-[#181818] text-left">
                          {format(new Date(item.created_at), "dd MMM. ’yy")}
                        </span>
                        <span className="flex-1 text-[12px] lg:text-[16px] font-[500] text-[#181818] text-left hidden lg:block">
                          {item.total_amount
                            ? `$ ${item.total_amount.toLocaleString()}`
                            : "---"}
                        </span>
                        <span
                          className="flex-1 text-[12px] lg:text-[16px] font-[400] text-[#181818] text-left truncate max-w-[80px] lg:max-w-none capitalize "
                          title={item.booking_type} // Shows full text on hover
                        >
                          {item.booking_type}
                        </span>

                        <span
                          className={`flex-1 text-[12px] lg:text-[16px] font-[600] lowercase ${
                            item.status === "PENDING"
                              ? "text-[#FF6F1E]"
                              : "text-[#2D9C5E]"
                          } text-left`}
                        >
                          {item.status}
                        </span>

                        {/* Actions */}
                        <div className="flex  lg:flex-1 items-center space-x-[8px]">
                          <div className="flex items-center space-x-[4px] text-[#023E8A] cursor-pointer">
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
          )}
        </div>
      )}
      {/* 
      <div className="flex justify-center mt-4 ">
        <div className="bg-[#EBECED] cursor-pointer rounded-[8px] space-x-[16px] px-[40px] py-[16px] flex  items-center ">
          <p className="font-[400] text-[14px] text-[#023E8A] leading-[100%] ">
            Load more
          </p>
          <img src="/assets/icons/loader.svg" alt="" className="" />
        </div>
      </div> */}
    </div>
  );
};

const LoadingUser = () => {
  return (
    <div className="w-full space-y-[12px] px-6">
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[40px] w-ful"></div>
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[40px] w-ful"></div>
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[40px] w-ful"></div>
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[40px] w-ful"></div>
      <div className="bg-gray-300 rounded-[12px] animate-pulse h-[40px] w-ful"></div>
    </div>
  );
};
