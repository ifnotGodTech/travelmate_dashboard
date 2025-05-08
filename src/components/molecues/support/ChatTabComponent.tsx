"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useGetAllChat } from "@/hooks/api/chat";
import { format } from "date-fns";

const ChatTabContent = () => {
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const { data, loading } = useGetAllChat({});

  const chats = useMemo(() => {
    return data.map((chat: any) => {
      const updatedDate = new Date(chat.updated_at);

      return {
        id: chat.id,
        name: `${chat.user_info.first_name || "---"} ${
          chat.user_info.last_name || "---"
        }`,
        message: chat.last_message?.content || "No messages yet",
        date: format(updatedDate, "d MMM, yyyy"), // Format as 25 Feb, 2025
        time: format(updatedDate, "h:mma").toLowerCase(), // Format as 9:25am
        number: chat.unread_count,
      };
    });
  }, [data]);

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
            {loading ? (
              <ChatsLoader />
            ) : (
              <ul>
                {chats.map((chat: any) => (
                  <li
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`p-2 mb-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                      selectedChat === chat.id ? "bg-gray-200" : ""
                    }`}
                  >
                    <div className="flex space-x-[8px] lg:space-x-0 lg:justify-between items-center">
                      <div className="flex items-start lg:items-center space-x-[8px] flex-1">
                        <img src="/assets/icons/Message-icon.svg" alt="Icon" />
                        <div className="space-y-[8px]">
                          <p className="font-[400] text-[14px] lg:font-[500] lg:text-[16px] text-[#181818]">
                            {chat.name}
                          </p>
                          <p className="text-[#67696D] text-[10px] leading-[100%] lg:text-[12px] lg:leading-[18px] overflow-hidden whitespace-nowrap text-ellipsis max-w-[20ch] lg:max-w-[60ch]">
                            {chat.message.length > 35
                              ? `${chat.message.slice(0, 35)}...`
                              : chat.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2 lg:space-x-[50px]  flex-1 justify-end">
                        <div className="flex items-end lg:space-x-[40px] space-x-0 flex-col lg:flex-row space-y-[8px] lg:space-y-0 justify-end ">
                          <p
                            className={`text-[12px] lg:text-[14px] text-[#181818] ${
                              selectedChat ? "hidden" : "block"
                            }`}
                          >
                            {chat.date}
                          </p>
                          <p
                            className={`text-[12px] lg:text-[14px] text-[#181818] ${
                              selectedChat ? "hidden" : "block"
                            }`}
                          >
                            {chat.time}
                          </p>
                        </div>
                        <div className="flex items-center space-x-[4px]">
                          {chat.number > 0 && (
                            <div className="bg-[#023E8A] rounded-full h-[30px] w-[30px] flex justify-center items-center">
                              <span className="text-white">{chat.number}</span>
                            </div>
                          )}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTabContent;

const ChatsLoader = () => {
  return (
    <div className="space-y-[20px] w-full">
      <div className="w-full h-10 rounded-[10px]  bg-[#f1f1f1] animate-pulse"></div>
      <div className="w-full h-10 rounded-[10px]  bg-[#f1f1f1] animate-pulse"></div>
      <div className="w-full h-10 rounded-[10px]  bg-[#f1f1f1] animate-pulse"></div>
      <div className="w-full h-10 rounded-[10px]  bg-[#f1f1f1] animate-pulse"></div>
      <div className="w-full h-10 rounded-[10px]  bg-[#f1f1f1] animate-pulse"></div>
    </div>
  );
};
