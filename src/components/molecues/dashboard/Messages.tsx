import React from 'react'
import { MessageProps } from '@/app/Dashboard/page';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Loading from '@/app/Dashboard/admin/loading';
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


export default Chat