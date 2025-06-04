"use client";
import React, { useEffect, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import axios from "axios";
import env from "@/config/env";
import { ChevronDown, ChevronRight } from "lucide-react";
import { showErrorToast } from "@/utils/toasters";
import { useAuthContext } from "@/context/AuthContext";

const page = () => {
  const APP_STATE = useAuthContext();
  const isSuperadmin = APP_STATE?.user?.isSuperuser;
  const [activity, setActivity] = useState<ActivityProps[]>([]);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Bookings>({total_bookings: 0});
  const [revenue, setRevenue] = useState<RevenueProps | null>(null);
  const [users, setUsers] = useState<UsersProps>({ total_normal_users: 0 });
  const [selectedOption, setSelectedOption] = useState("This week");
  const [allBookings, setAllBookings] = useState<BookingsProps[]>([])

  const router = useRouter();
  // if (!APP_STATE?.user || !APP_STATE?.accessToken) {
  //   showErrorToast({ message: "You are not authorized to view this page" });
  //   router.push("/login");
  //   return null;
  // }

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [activities, messages, revenue, bookings, user] = await Promise.all(
        [
          axios.get(env.api.dashboardactivities, {
            headers: {
              Authorization: `Bearer ${APP_STATE.accessToken}`,
            },
          }),
          axios.get(env.api.dashboardmessages, {
            headers: {
              Authorization: `Bearer ${APP_STATE.accessToken}`,
            },
          }),
          axios.get(env.api.dashboardrevenue, {
            headers: {
              Authorization: `Bearer ${APP_STATE.accessToken}`,
            },
          }),
          axios.get(env.api.dashboardbookings, {
            headers: {
              Authorization: `Bearer ${APP_STATE.accessToken}`,
            },
          }),
          axios.get(env.api.usercount, {
            headers: {
              Authorization: `Bearer ${APP_STATE.accessToken}`,
            },
          }),
        ]
      );
      setActivity(activities.data);
      setMessages(messages.data);
      setBookings(bookings.data);
      isSuperadmin && setRevenue(revenue.data);
      setUsers(user.data);
      console.log(bookings.data)
    } catch (error: any) {
      showErrorToast({ message: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  }, [APP_STATE, isSuperadmin]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const generateWeeklyChartData = (bookings: BookingsProps[]) => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // Initialize a structure for each weekday with zero values
    const weeklyData = weekDays.map((day) => ({
      day,
      flight: 0,
      hotel: 0,
      car: 0,
      total_amount: 0,
    }));

    // Sum up total_amounts per booking type per day
    bookings.forEach((item) => {
      const date = new Date(item.created_at);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" }); // e.g., "Mon"

      const target = weeklyData.find((entry: any) => entry.day === dayOfWeek);
      if (target && item.total_amount) {
        target[item.booking_type] += item.total_amount;
      }
    });
    return weeklyData;
  };

  const filteredData = useMemo(() => {
    const now = new Date();
    return allBookings.filter((item) => {
      const createdAt = new Date(item.created_at);

      if (selectedOption === "This week") {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return createdAt >= startOfWeek;
      } else if (selectedOption === "This month") {
        return (
          createdAt.getMonth() === now.getMonth() &&
          createdAt.getFullYear() === now.getFullYear()
        );
      } else if (selectedOption === "This year") {
        return createdAt.getFullYear() === now.getFullYear();
      }
      return true;
    });
  }, [bookings, selectedOption]);

  const weeklyData = useMemo(
    () => generateWeeklyChartData(filteredData),
    [filteredData]
  );

  const DashboardSkeletonLoader = () => {
    return (
      <div className="space-y-10 py-4 lg:py-0">
        {/* Statistics Section */}
        <div className="flex justify-between items-start flex-col-reverse lg:flex-row gap-y-4 lg:gap-0 px-3">
          <div className="space-y-6">
            {/* Time Filter Dropdown Skeleton */}
            <div className="w-32 h-8 bg-gray-300 rounded-md animate-pulse"></div>

            {/* Stat Cards Skeleton */}
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="lg:p-[20px] lg:rounded-[20px] lg:space-y-[12px] lg:w-[168px] bg-gray-300 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-32 h-6 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="w-48 h-8 bg-gray-300 rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* DataGrid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Section (Charts and Activities) */}
          <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-rows-2 gap-6 h-[45rem]">
              {/* Chart Skeleton */}
              <div className="bg-gray-300 rounded-2xl animate-pulse h-full"></div>

              {/* Activity Skeleton */}
              <div className="bg-gray-300 rounded-2xl animate-pulse h-full"></div>
            </div>
          </div>

          {/* Right Section (Messages) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-300 rounded-2xl animate-pulse h-full"></div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="space-y-10 py-4 lg:py-0">
      {loading ? (
        <DashboardSkeletonLoader />
      ) : (
        <>
          <Statistics
            bookings={bookings}
            revenue={revenue}
            users={users}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            isSuperadmin={isSuperadmin}
          />
          <DataGrid
            activity={activity}
            loading={loading}
            messages={messages}
            bookings={bookings}
            weeklyData={weeklyData}
          />
        </>
      )}
    </div>
  );
};

const Statistics = ({
  bookings,
  revenue,
  users,
  selectedOption,
  setSelectedOption,
  isSuperadmin,
}: {
  bookings: Bookings;
  revenue: RevenueProps | null;
  users: UsersProps;
  selectedOption: string;
  setSelectedOption: any;
  isSuperadmin: boolean;
}) => {
  let NGNNaira = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function formatMoney(number: number) {
    if (Math.abs(number) >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    }
    return number.toLocaleString();
  }

  return (
    <div className="flex justify-between items-start flex-col-reverse lg:flex-row gap-y-4 lg:gap-0 px-3 ">
      <div className="space-y-6">
        <TimeFilterDropdown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Users"
            value={users?.total_normal_users?.toLocaleString() || "0"}
            color="#50AC79"
            icon="/assets/icons/ana-users.svg"
            smColor="#D5EBDF"
          />
          <StatCard
            title="Bookings"
            value={bookings.total_bookings.toLocaleString()}
            color="#023E8A"
            icon="/assets/icons/ana-bookings.svg"
            smColor="#CCD8E8"
          />
          {isSuperadmin && (
            <StatCard
              title="Revenue"
              value={
                revenue
                  ? Math.abs(revenue.total_revenue) >= 1000000
                    ? `₦${formatMoney(revenue.total_revenue)}`
                    : NGNNaira.format(revenue.total_revenue)
                  : "₦0"
              }
              color="#FF6F1E"
              icon="/assets/icons/ana-revenue.svg"
              smColor="#FFCFB4"
            />
          )}
        </div>
      </div>
      {isSuperadmin && (
        <div className="space-y-2">
          <p className="text-sm lg:text-base font-semibold text-[#181818]">
            Total Revenue
          </p>

          <h1 className="text-2xl font-semibold text-[#023E8A]">
            {revenue ? NGNNaira.format(Number(revenue.total_revenue)) : "₦0"}
          </h1>
        </div>
      )}
    </div>
  );
};

const StatCard = ({
  title,
  value,
  color,
  icon,
  smColor,
}: {
  title: string;
  value: string;
  color: string;
  icon: string;
  smColor: string;
}) => {
  return (
    <>
      <div
        className="lg:p-[20px] hidden lg:block lg:rounded-[20px] lg:space-y-[12px] lg:w-[168px] cursor-pointer bg-transparent lg:bg-none"
        style={{ backgroundColor: color }}
      >
        <div
          className={
            "w-10 h-10 rounded-[8px] flex justify-center items-center bg-[#fff] "
          }
        >
          <img src={icon} alt="" className="" />{" "}
        </div>
        <div className="space-y-2">
          <h1 className="font-[600] text-[28px] leading-[100%] text-[#fff]">
            {value}
          </h1>
          <p className="font-[500] text-[16px] leading-[100%] text-[#fff]">
            {title}
          </p>
        </div>
      </div>

      <div className=" space-x-2 lg:hidden flex items-center ">
        <div
          className="w-10 h-10 rounded-full flex justify-center items-center"
          style={{ backgroundColor: smColor }}
        >
          <img src={icon} alt="" className="" />{" "}
        </div>
        <div className="space-y-2">
          <h1 className="font-[600] text-[14px] lg:text-[28px]  leading-[100%] text-[#181818]">
            {value}
          </h1>
          <p className="font-[500] text-[12px] b:text-[16px]  leading-[100%] text-[#555]">
            {title}
          </p>
        </div>
      </div>
    </>
  );
};

const DataGrid = ({
  activity,
  loading,
  messages,
  bookings,
  weeklyData,
}: {
  activity: ActivityProps[];
  loading: boolean;
  messages: MessageProps[];
  bookings: Bookings;
  weeklyData: any;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-10">
        <div className="grid grid-rows-2 gap-6 h-[45rem]">
          <Chart weeklyData={weeklyData} />
          <Activity activity={activity} loading={loading} />
        </div>
      </div>
      <div className="lg:col-span-1">
        <Chat messages={messages} loading={loading} />
      </div>
    </div>
  );
};

const Legend = () => {
  return (
    <div className="flex space-x-6 items-center">
      <div className="flex space-x-1 items-center cursor-pointer ">
        <img src="/assets/icons/ana-airplane.svg" alt="" className="" />
        <span className="text-[12px] font-[500] leading-[100%] text-[#181818]  ">
          Flight
        </span>
      </div>
      <div className="flex space-x-1 items-center cursor-pointer ">
        <img src="/assets/icons/ana-bed.svg" alt="" className="" />
        <span className="text-[12px] font-[500] leading-[100%] text-[#181818]  ">
          Hotel
        </span>
      </div>
      <div className="flex space-x-1 items-center cursor-pointer ">
        <img src="/assets/icons/ana-car.svg" alt="" className="" />
        <span className="text-[12px] font-[500] leading-[100%] text-[#181818]  ">
          Car
        </span>
      </div>
    </div>
  );
};

const Chart = ({ weeklyData }: { weeklyData: any[] }) => {
  const router = useRouter();
  let NGNNaira = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });
  return (
    <div className="bg-white lg:px-6 py-6 rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Booking Trends</h2>
        <div className="hidden lg:block">
          <Legend />
        </div>
        <div
          className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 "
          onClick={() => router.push("/Dashboard/reports")}
        >
          View full report
        </div>
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={weeklyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" className="text-xs" />
            <YAxis
              className="text-[8px]"
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  maximumFractionDigits: 0,
                })
                  .format(value)
                  .replace(/\.00/, "")
              }
            />

            <Tooltip />
            <Line
              type="monotone"
              dataKey="flight"
              stroke="#FF6D00"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="hotel"
              stroke="#00C853"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="car"
              stroke="#2962FF"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="lg:hidden flex justify-center mt-1">
        <Legend />
      </div>
    </div>
  );
};

const Chat = ({
  messages,
  loading,
}: {
  messages: MessageProps[];
  loading: boolean;
}) => {
  const router = useRouter();
  const getMeridian = (dateString: string) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    return hour >= 12 ? "PM" : "AM";
  };
  return (
    <div className="bg-[#fff] h-full px-4 py-[30px] rounded-[16px] overflow-y-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center lg:px-[20px] ">
          <h3 className="font-[500] text-[18px] text-[#181818] leading-[100%]">
            Messages
          </h3>
          <div
            className="flex items-center space-x-2 cursor-pointer "
            onClick={() => router.push("/Dashboard/support")}
          >
            <p className="font-[500] text-[16px] text-[#023E8A] leading-[100%]">
              See all
            </p>
            <ChevronRight stroke="#023E8A" />
          </div>
        </div>
        <div className="w-full h-[3px] bg-[#EBECED]"></div>
        <div className="">
          {loading ? (
            <Loading />
          ) : (
            messages.slice(0, 10).map((msg, i) => (
              <div
                key={msg.id}
                className={`py-3 lg:px-[20px]  w-full flex space-x-4 items-center cursor-pointer hover:bg-[#f2f2f2]  ${
                  i === messages.length - 1
                    ? ""
                    : "border-b-[2px] border-[#F5F5F5]"
                }`}
              >
                <img
                  src={
                    msg.type === "ticket_message"
                      ? `/assets/icons/flight_cancellation.svg`
                      : `/assets/icons/Message-icon.svg`
                  }
                  alt=""
                  className=""
                />
                <div className="flex-1 justify-between flex items-center">
                  <p className="font-[400] text-sm text-[#181818] leading-[100%]">
                    {msg.title.length > 15
                      ? `${msg.title.slice(0, 20)}...`
                      : `${msg.title} by ${msg.sender}`}
                  </p>
                  <span className="font-[400] text-[12px] text-[#9B9EA4] leading-[100%]">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    {getMeridian(msg.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const Activity = ({
  activity,
  loading,
}: {
  activity: ActivityProps[];
  loading: boolean;
}) => {
  const router = useRouter();
  let NGNNaira = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });
  const getMeridian = (dateString: string) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    return hour >= 12 ? "PM" : "AM";
  };

  return (
    <div className="bg-white h-full lg:p-6 rounded-2xl overflow-y-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-medium text-[#181818]">
            Recent Activities
          </h1>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/Dashboard/bookings")}
          >
            <p className="text-base font-medium text-[#023E8A]">See all</p>
            <ChevronRight stroke="#023E8A" />
          </div>
        </div>
        <div className="space-y-4">
          {loading ? (
            <Loading />
          ) : activity.length === 0 ? (
            <p className="text-center mt-auto">No recent activities</p>
          ) : (
            activity.map((act, i) => (
              <div
                key={i}
                className="flex md:justify-center justify-between lg:gap-24 gap-16 w-full items-center cursor-pointer hover:bg-[#f1f1f1] rounded-xl py-2 lg:px-3 px-2"
                onClick={() => router.push("/Dashboard/user/profile")}
              >
                <div className="flex items-center space-x-3 lg:w-[200px] w-full">
                  <img
                    src="/assets/images/profile-image.svg"
                    alt=""
                    className="lg:w-10 w-6"
                  />
                  <p className="lg:text-base text-sm font-medium text-[#181818]">
                    {act.user_full_name}
                  </p>
                </div>
                <p className="lg:text-sm text-xs text-[#181818]">
                  {act.booking_type}
                </p>
                <div className="flex items-center ml-auto space-x-2">
                  <div className="text-right">
                    <p className="lg:text-sm text-xs text-[#181818]">
                      {NGNNaira.format(act.amount)}
                    </p>
                    <p className="lg:text-sm text-xs text-[#9B9EA4]">
                      {new Date(act.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      {getMeridian(act.date)}
                    </p>
                  </div>
                  <img
                    src="/assets/icons/chevron-down.svg"
                    alt=""
                    className="w-5"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// TimeFilterDropdown.tsx
export const TimeFilterDropdown = ({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}) => {
  const options = ["This week", "This month", "This year"];
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-2 cursor-pointer px-3 py-2">
            <p className="text-sm lg:text-base font-semibold text-[#181818]">
              {selectedOption}
            </p>
            <ChevronDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-full mt-2 border rounded-lg bg-white shadow-lg space-y-2"
          align="start"
        >
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => setSelectedOption(option)}
              className={`px-3 py-2 space-y-2 cursor-pointer ${
                selectedOption === option
                  ? "font-bold text-white bg-gray-400"
                  : "text-gray-700"
              }`}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const Loading = () => {
  return (
    <div className="text-center flex items-center justify-center gap-3">
      <p>Loading...</p>
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};
export default page;

type ActivityProps = {
  user_full_name: string;
  amount: number;
  date: string;
  profile_picture: string;
  booking_type: string;
};

type MessageProps = {
  content: string;
  created_at: string;
  id: string;
  link: string;
  sender: null;
  title: string;
  type: string;
};

type RevenueProps = {
  total_revenue: number;
  car_revenue: number;
  flight_revenue: number;
  currency: string;
};
type UsersProps = {
  total_normal_users: number;
};
type Bookings ={
  total_bookings : number
}
type BookingsProps = {
  booking_type: "flight" | "hotel" | "car";
  created_at: string;
  details: {
    arrival?: string;
    departure?: string;
    departure_date?: string;
    flight_number?: string;
  };
  email: string;
  id: string;
  specific_id: number;
  status: string;
  total_amount: number | null;
  user: string;
};
