"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Chat = {
  name: string;
  message: string;
  time: string;
  status: string;
  date: string;
  number: number;
};

const ChatTabContent = () => {
  const router = useRouter();
  const chats: Chat[] = Array(4).fill({
    name: "Kemi Adeoti",
    message: "Can you help me with my recent order?",
    time: "4:44 PM",
    status: "Online",
    date: "16 Feb, 2025",
    number: 3,
  });

  return (
    <div>
      <div className="w-full overflow-hidden flex justify-center items-center">
        <div className="flex w-full h-full py-[16px] lg:px-[24px] bg-[#FFFFFF]">
          <div className="overflow-y-auto transition-all duration-300 space-y-[32px] w-full">
            <div className="flex justify-between">
              <h2 className="font-[500] lg:font-[600] text-[14px] lg:text-[20px] text-[#181818]">
                Chats
              </h2>
              <img
                src="/assets/icons/expand.svg"
                alt=""
                className="cursor-pointer lg:block "
                onClick={() => router.push("/Dashboard/support/chat")}
              />
            </div>
            <div className="w-full h-[2px] bg-[#EBECED]"></div>
            <ul>
              {chats.map((chat, index) => (
                <li
                  key={index}
                  className="p-2 mb-2 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex space-x-[8px] lg:space-x-0 lg:justify-between items-center">
                    <div className="flex items-start lg:items-center space-x-[8px] flex-1 ">
                      <img src="/assets/icons/Message-icon.svg" alt="Icon" />
                      <div className="space-y-[8px]">
                        <p className="font-[400] text-[14px] lg:font-[500] lg:text-[16px] text-[#181818]">
                          {chat.name}
                        </p>
                        <p className="text-[#67696D] text-[10px] leading-[100%] lg:text-[12px] lg:leading-[18px] overflow-hidden whitespace-nowrap text-ellipsis max-w-[20ch] lg:max-w-[60ch]">
                          {chat.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2 lg:space-x-[50px]  flex-1 justify-end">
                      <div className="flex items-end lg:space-x-[40px] space-x-0 flex-col lg:flex-row space-y-[8px] lg:space-y-0 justify-end ">
                        <p className="text-[12px] lg:text-[14px] text-[#181818]">
                          {chat.date}
                        </p>
                        <p className="text-[12px] lg:text-[14px] text-[#181818]">
                          {chat.time}
                        </p>
                      </div>
                      <div className="flex items-center space-x-[4px] ">
                        <div className="bg-[#023E8A] rounded-full h-[30px] w-[30px] flex justify-center items-center">
                          <span className="text-white">{chat.number}</span>
                        </div>
                        <img
                          src="/assets/icons/arrow-down.svg"
                          alt="More"
                          className="w-4 h-4 -rotate-90"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTabContent;

{
  /* <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.sender === "Support" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 max-w-[290px]  ${
                    message.sender === "Support"
                      ? "bg-[#023E8A] text-white py-[16px] px-[24px] rounded-t-[26px] rounded-bl-[26px]"
                      : "bg-[#EBECED] py-[16px] px-[24px] rounded-t-[26px] rounded-br-[26px]  text-black"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */
}

// </div>
