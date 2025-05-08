"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  useGetAllChat,
  useGetChatMessages,
  useWebSocketService,
} from "@/hooks/api/chat";
import { format } from "date-fns";

const page = () => {
  return (
    <div className="w-full h-[77vh] overflow-x-hidden">
      <ChatPage />
    </div>
  );
};

const ChatPage: React.FC = () => {
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
    <div className="w-full h-full flex">
      {/* Chat List Section */}
      <div
        className={`transition-all duration-300 ${
          selectedChat === null
            ? "w-full rounded-[10px]"
            : "w-1/3 rounded-l-[20px]"
        } h-full border-r bg-white overflow-y-auto p-4`}
      >
        <h2 className="font-semibold text-lg mb-4">Chats</h2>
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
                  {selectedChat === null && (
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
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedChat !== null && <Conversation selectedChat={selectedChat} />}
    </div>
  );
};

const Conversation: React.FC<{ selectedChat: number }> = ({ selectedChat }) => {
  const [input, setInput] = useState("");
  const { messages: liveMessages, send } = useWebSocketService(selectedChat);
  const {
    messages: historyMessages,
    onFetchMessages,
    loadingMessage,
  } = useGetChatMessages();

  const messageEndRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onFetchMessages({ id: selectedChat });
  }, [selectedChat]);

  const name = `${historyMessages?.user_info?.first_name || "---"} ${
    historyMessages?.user_info?.last_name || "---"
  }`;

  // Combine past and real-time messages
  const allMessages = useMemo(() => {
    const history = historyMessages?.messages || [];
    const live = liveMessages.filter(
      (live) => !history.some((msg: any) => msg.id === live.id)
    );
    return [...history, ...live];
  }, [historyMessages, liveMessages]);

  const handleSend = () => {
    if (input.trim()) {
      const payload = {
        messageId: Date.now(),
        message: input,
        chatId: selectedChat,
      };
      send(payload);
      setInput("");
    }
  };

  // Scroll to bottom whenever messages change or new message is sent
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  return (
    <div className="flex-1 flex flex-col bg-white rounded-r-[20px]">
      <div className="p-4 border-b">
        {loadingMessage ? (
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#f1f1f1] animate-pulse text-[#181818] font-semibold text-[20px]"></div>
            <div className="w-44 h-7 rounded-[10px] flex items-center justify-center bg-[#f1f1f1] animate-pulse text-[#181818] font-semibold text-[20px]"></div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            {historyMessages?.user_info?.image || (
              <ProfilePictureT email={historyMessages?.user_info?.email} />
            )}
            <h2 className="font-semibold">{name}</h2>
          </div>
        )}
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {loadingMessage ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : (
          allMessages.map((message: any, index: number) => (
            <div
              key={message.id || index}
              className={`mb-1 flex ${
                message.sender_info?.id === historyMessages?.admin_info?.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`p-3 max-w-[290px] ${
                  message.sender_info?.id === historyMessages?.admin_info?.id
                    ? "bg-[#023E8A] text-white"
                    : "bg-gray-300 text-black"
                } rounded-t-[26px] ${
                  message.sender_info?.id === historyMessages?.admin_info?.id
                    ? "rounded-br-[26px]"
                    : "rounded-bl-[26px]"
                }`}
              >
                {message.message || message.content || "No content available"}
              </div>
            </div>
          ))
        )}
        {/* Scroll to the latest message */}
        <div ref={messageEndRef} />
      </div>
      <div className="p-4 border-t flex items-center gap-4">
        <div className="bg-[#EBECED] flex-1 p-3 space-x-4 border rounded-lg flex items-center">
          <img
            src="/assets/icons/emoji.svg"
            alt=""
            className="cursor-pointer"
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 outline-none"
          />
          <img
            src="/assets/icons/attachment.svg"
            alt=""
            className="cursor-pointer"
          />
        </div>
        <button
          onClick={handleSend}
          className="p-3 bg-[#023E8A] text-white rounded-lg"
        >
          <img
            src="/assets/icons/white-send.svg"
            alt="Send"
            className="cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

const ChatsLoader = () => {
  return (
    <div className="space-y-[20px] w-full">
      <div className="w-full h-10 rounded-[10px]  bg-[#f1f1f1] animate-pulse"></div>
      <div className="w-full h-10 rounded-[10px]  bg-[#f1f1f1] animate-pulse"></div>
      <div className="w-full h-10 rounded-[10px]  bg-[#f1f1f1] animate-pulse"></div>
      <div className="w-full h-10 rounded-[10px]  bg-[#f1f1f1] animate-pulse"></div>
      <div className="w-full h-10 rounded-[10px]  bg-[#f1f1f1] animate-pulse"></div>
      <div className="w-full h-10 rounded-[10px]  bg-[#f1f1f1] animate-pulse"></div>
      <div className="w-full h-10 rounded-[10px]  bg-[#f1f1f1] animate-pulse"></div>
    </div>
  );
};

const ProfilePictureT = ({ email }: { email: string }) => {
  const firstLetter = email?.charAt(0)?.toUpperCase() || "?" || "";

  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#f5f5f5] text-[#181818] font-semibold text-[20px]">
      {firstLetter}
    </div>
  );
};

export default page;
