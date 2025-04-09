"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartData } from "@/components/data";

const page = () => {
  return (
    <div className="space-y-10 py-4 lg:py-0">
      <Statistics />
      <DataGrid />
    </div>
  );
};

const Statistics = () => {
  return (
    <div className="flex justify-between items-start flex-col-reverse lg:flex-row gap-y-4 lg:gap-0 ">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <p className="text-sm lg:text-base font-semibold text-[#181818]">
            This week
          </p>
          <img
            src="/assets/icons/chevron-down.svg"
            alt=""
            className="w-5 rotate-90"
          />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Users"
            value="2,481"
            color="#50AC79"
            icon="/assets/icons/ana-users.svg"
            smColor="#D5EBDF"
          />
          <StatCard
            title="Bookings"
            value="4,892"
            color="#023E8A"
            icon="/assets/icons/ana-bookings.svg"
            smColor="#CCD8E8"
          />
          <StatCard
            title="Revenue"
            value="N4.2m"
            color="#FF6F1E"
            icon="/assets/icons/ana-revenue.svg"
            smColor="#FFCFB4"
          />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm lg:text-base font-semibold text-[#181818]">
          Total Revenue
        </p>
        <h1 className="text-2xl font-semibold text-[#023E8A]">N89,200,000</h1>
      </div>
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
}) => (
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

const DataGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-10">
        <QuickActions />
        <div className="grid grid-rows-2 gap-6 h-[652px]">
          <Chart />
          <Activity />
        </div>
      </div>
      <div className="lg:col-span-1">
        <Chat />
      </div>
    </div>
  );
};

const QuickActions = () => (
  <div className="space-y-2">
    <h1 className="text-xl font-semibold">Quick Action</h1>
    <div className="flex flex-wrap gap-4">
      {[
        { name: "Daily Update", icon: "/assets/icons/quick-add.svg" },
        { name: "Manage Listings", icon: "/assets/icons/quick-manage.svg" },
        { name: "Share points", icon: "/assets/icons/quick-share.svg" },
      ].map((text) => (
        <div
          className="flex items-center space-x-3 bg-[#CCD8E8] rounded-xl p-4 cursor-pointer "
          key={text.name}
        >
          <img src={text.icon} alt="" className="w-5" />
          <span className="text-base font-medium text-[#181818]">
            {text.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const Chart = () => (
  <div className="bg-white px-4 py-6 rounded-2xl overflow-hidden h-full flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Booking Trends</h2>
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
      <a href="#" className="text-sm text-blue-600">
        View full report
      </a>
    </div>
    <div className="flex-grow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={ChartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Flight"
            stroke="#FF6D00"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Hotel"
            stroke="#00C853"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Car"
            stroke="#2962FF"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const Chat = () => {
  const message = Array(10).fill({
    message: "Ticket booked by Sam Ade",
    time: "4:44 PM",
  });

  return (
    <div className="bg-[#fff] h-full px-[10px] py-[30px] rounded-[16px] overflow-y-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center px-[20px] ">
          <h3 className="font-[500] text-[18px] text-[#181818] leading-[100%]">
            Messages
          </h3>
          <div className="flex items-center space-x-2 cursor-pointer ">
            <p className="font-[500] text-[16px] text-[#023E8A] leading-[100%]">
              See all
            </p>
            <img
              src="/assets/icons/chevron-down.svg"
              alt=""
              className="w-[20px] lg:w-[16px]"
            />
          </div>
        </div>
        <div className="w-full h-[3px] bg-[#EBECED]"></div>
        <div className="">
          {message.map((msg, i) => (
            <div
              className={`py-3 px-[20px]  w-full flex space-x-4 items-center cursor-pointer hover:bg-[#f2f2f2]  ${
                i === message.length - 1
                  ? ""
                  : "border-b-[2px] border-[#F5F5F5]"
              }`}
            >
              <img
                src="/assets/icons/flight_cancellation.svg"
                alt=""
                className=""
              />
              <div className="flex-1 justify-between flex items-center">
                <p className="font-[400] text-[16px] text-[#181818] leading-[100%]">
                  {msg.message}
                </p>
                <span className="font-[400] text-[12px] text-[#9B9EA4] leading-[100%]">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Activity = () => {
  const activity = Array(3).fill({
    name: "Kemi Adeoti",
    time: "02:40PM",
    amount: "N248,000",
    title: "Flight Booking",
  });
  return (
    <div className="bg-white h-full p-6 rounded-2xl overflow-y-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-medium text-[#181818]">
            Recent Activities
          </h1>
          <div className="flex items-center space-x-2 cursor-pointer">
            <p className="text-base font-medium text-[#023E8A]">See all</p>
            <img src="/assets/icons/chevron-down.svg" alt="" className="w-5" />
          </div>
        </div>
        <div className="space-y-4">
          {activity.map((act, i) => (
            <div
              key={i}
              className="flex justify-between items-center hover:bg-[#f1f1f1] rounded-xl py-2 px-3"
            >
              <div className="flex items-center space-x-3">
                <img
                  src="/assets/images/profile-image.svg"
                  alt=""
                  className="w-10"
                />
                <p className="text-base font-medium text-[#181818]">
                  {act.name}
                </p>
              </div>
              <p className="text-sm text-[#181818]">{act.title}</p>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm text-[#181818]">{act.amount}</p>
                  <p className="text-sm text-[#9B9EA4]">{act.time}</p>
                </div>
                <img
                  src="/assets/icons/chevron-down.svg"
                  alt=""
                  className="w-5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
