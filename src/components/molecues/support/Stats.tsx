import React from "react";

type Props = {};

const Stats = (props: Props) => {
  return (
    <div className="space-y-6 mt-[10] ">
      <div className="hidden lg:block">
        <div className="flex py-[10px] px-[10px] items-center space-x-[10px] ">
          <h1 className="text-[14px] font-[600px] leading-[100%] text-[#181818]">
            This Month
          </h1>
          <img src="/assets/icons/arrow-down.svg" alt="" className="w-[12px]" />
        </div>
      </div>
      <div className="flex lg:space-x-6 items-center flex-col lg:flex-row space-y-6 lg:space-y-0">
        <div className="w-full  lg:w-[246px] border-[#023E8A] border-[1px] bg-[#CCD8E8] p-[20px] space-y-[12px] rounded-[10px]">
          <div className="space-x-3 flex items-center justify-center ">
            <img src="/assets/icons/airplane_ticket.svg" alt="" className="" />
            <p className="text-[14px] font-[500px] leading-[100%] text-[#181818]">
              Open Tickets
            </p>
          </div>
          <div className="">
            <h1 className="text-[20px] font-[600px] leading-[100%] text-[#181818] text-center ">
              14
            </h1>
          </div>
        </div>
        <div className="w-full   lg:w-[246px] border-[#2D9C5E] border-[1px] bg-[#D5EBDF] p-[20px] space-y-[12px] rounded-[10px]">
          <div className="space-x-3 flex items-center justify-center ">
            <img src="/assets/icons/access_time.svg" alt="" className="" />
            <p className="text-[14px] font-[500px] leading-[100%] text-[#181818]">
              Average Response Time
            </p>
          </div>
          <div className="">
            <h1 className="text-[20px] font-[600px] leading-[100%] text-[#181818] text-center ">
              14 mins
            </h1>
          </div>
        </div>
        <div className="w-full   lg:w-[246px]  border-[#D72638] border-[1px] bg-[#FAE0E6] p-[20px] space-y-[12px] rounded-[10px]">
          <div className="space-x-3 flex items-center justify-center ">
            <img src="/assets/icons/card-escalate.svg" alt="" className="" />
            <p className="text-[14px] font-[500px] leading-[100%] text-[#181818]">
              Escalated Issues
            </p>
          </div>
          <div className="">
            <h1 className="text-[20px] font-[600px] leading-[100%] text-[#181818] text-center ">
              3
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
