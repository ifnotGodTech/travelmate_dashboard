"use client";
import React, { useState } from "react";

interface Chat {
  name: string;
  message: string;
  time: string;
  status: string;
  date: string;
  number: number;
}

interface Message {
  sender: string;
  text: string;
}

const Page: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const chats: Chat[] = Array(10).fill({
    name: "Kemi Adeoti",
    message: "Can you help me with my recent order?",
    time: "4:44 PM",
    status: "Online",
    date: "16 February, 2025",
    number: 3,
  });

  const messages: Message[] = [
    { sender: "Kemi Adeoti", text: "Hi, I need help with my order." },
    { sender: "Support", text: "Sure, can you provide your order ID?" },
    { sender: "Kemi Adeoti", text: "Yes, it's 123456." },
    { sender: "Support", text: "Thank you, let me check that for you." },
  ];

  return (
    <div className="w-full space-y-[16px] ">
      <div className="">
        <img src="/assets/icons/arrow-back.svg" alt="" className="" />
      </div>
      <div className="h-[77vh] min-w-[100%] overflow-hidden flex justify-center items-center">
        {/* Chat Box */}
        <div className="flex w-full h-[100%] border rounded-lg overflow-hidden py-[16px] px-[24px] bg-[#FFFFFF] ">
          {/* Chat List */}
          <div
            className={` overflow-y-auto transition-all duration-300 space-y-[32px] ${
              selectedChat !== null ? "w-1/3" : "w-full"
            }`}
          >
            <h2 className="font-[500] lg:font-[600] text-[14px] lg:text-[20px] text-[#181818] sticky">
              Chats
            </h2>
            <div className="w-full h-[2px] bg-[#EBECED] "></div>
            <ul>
              {chats.map((chat, index) => (
                <li
                  key={index}
                  className={`p-2 mb-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                    selectedChat === index ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setSelectedChat(index)}
                >
                  <div className="flex space-x-4 items-center">
                    <img
                      src="/assets/icons/flight_cancellation.svg"
                      alt=""
                      className=""
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="w-full space-y-[8px]">
                          <p className="font-[400] text-[14px] lg:font-[500] lg:text-[16px] text-[#181818]">
                            {chat.name}
                          </p>
                          <p className="text-[#67696D] text-[10px] leading-[100%] lg:text-[12px] lg:leading-[18px]  ">
                            {chat.message}
                          </p>
                        </div>
                        <div className="w-full flex justify-between items-center">
                          <div className="flex justify-between items-center space-x-[40px] ">
                            <p className=" text-[12px] leading-[18px] font-[400] lg:text-[14px] lg:leading-[100%] text-[#s181818]  ">
                              {chat.date}
                            </p>
                            <p className="text-[12px] leading-[18px] font-[400] lg:text-[14px] lg:leading-[100%] text-[#s181818] ">
                              {chat.time}
                            </p>
                          </div>

                          <div className="bg-[#023E8A] rounded-full h-[30px] w-[30px] flex justify-center items-center ">
                            <span className="text-[12px] leading-[18px] font-[400] lg:text-[14px] lg:leading-[100%] text-[#fff] ">
                              {chat.number}
                            </span>
                          </div>

                          <div className="">
                            <img
                              src="/assets/icons/arrow-down.svg"
                              alt=""
                              className="w-4 h-4 -rotate-90 "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex justify-between">
                  <span className="font-semibold">{chat.name}</span>
                  <span className="text-sm text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.message}</p> */}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Area */}
          {selectedChat !== null && (
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
                <h2 className="font-semibold">{chats[selectedChat].name}</h2>
                <span className="text-sm text-gray-500">
                  {chats[selectedChat].status}
                </span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      message.sender === "Support"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-xs ${
                        message.sender === "Support"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t flex gap-4">
                {/* <Input placeholder="Type a message" className="flex-1" />
              <Button>Send</Button> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
