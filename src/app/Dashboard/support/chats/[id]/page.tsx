"use client";
import React from "react";
import { useRef, useEffect, useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useGetChat } from "@/hooks/api/chat";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { useWebSocketService } from "@/hooks/api/chat";
import ChatService from "@/services/chat";

const formatDate = (isoDate: any) => {
  if (!isoDate) {
    return "Invalid date";
  }

  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return format(date, "EEEE dd/MM/yyyy | hh:mm a");
};

type Props = {};

const page = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const { chat, loadingChat } = useGetChat({
    ChatId: id as string,
    initialFetch: !!id,
    successCallback: (message) => {
      console.log(message);
    },
    errorCallback: (error) => {
      console.error(error);
    },
  });
  const router = useRouter();
  const [closing, setClosing] = useState(false);

  // Close chat handler
  const handleCloseChat = async () => {
    if (!chat?.id) return;
    setClosing(true);
    try {
      await ChatService.closeChat({ id: chat.id });
      // Optionally, show a toast or notification
      router.push("/Dashboard/support/chats"); // Redirect after closing
    } catch (error) {
      // Optionally, show error toast
      console.error(error);
    } finally {
      setClosing(false);
    }
  };

  return (
    <div className="space-y-[24px]">
      <div className="flex justify-between items-center">
        <img
          src="/assets/icons/arrow-back.svg"
          alt="Back"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <div className="flex space-x-6">
          <button
            className={`rounded-[8px] font-medium p-4 cursor-pointer ${
              chat?.status === "CLOSED"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#023E8A] text-white"
            }`}
            onClick={handleCloseChat}
            disabled={closing || chat?.status === "CLOSED"}
          >
            {closing ? "Closing..." : "Close chat"}
          </button>
        </div>
      </div>

      {loadingChat ? (
        <p className="">Loading</p>
      ) : (
        <div className="space-y-4">
          <p className="font-medium text-[16px] text-[#181818]">
            {formatDate(chat?.created_at)}
          </p>
          <div className="flex space-x-3 items-center">
            <p className="lg:text-[16px] text-[12px]  font-semibold text-[#4E4F52]">
              Customer:{" "}
              <span className="font-medium">
                {chat?.user_info.first_name} {chat?.user_info.last_name}
              </span>
            </p>
            <div className="w-2 h-2 bg-[#9B9EA4] rounded-full"></div>
            <p className="lg:text-[16px] text-[12px]  font-semibold text-[#4E4F52]">
              Chat ID:{" "}
              <span className="font-medium">{"Chat--" + chat?.id}</span>
            </p>
            <div className="w-2 h-2 bg-[#9B9EA4] rounded-full"></div>
            <p className="lg:text-[16px] text-[12px] font-semibold text-[#4E4F52] capitalize">
              Chat Status:{" "}
              <span className="font-medium capitalize ">{chat?.status}</span>
            </p>
          </div>
        </div>
      )}

      <Session chat={chat} loadingChat={loadingChat} />
    </div>
  );
};

const Session = ({ chat, loadingChat }: any) => {
  const { messages: liveMessages, send } = useWebSocketService(chat?.id);
  const [input, setInput] = useState("");
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const name = `${chat?.user?.first_name || "---"} ${
    chat?.user?.last_name || "---"
  }`;

  const allMessages = useMemo(() => {
    const history = chat?.messages || [];
    const live = liveMessages.filter(
      (live: any) =>
        live.type !== "session_info" &&
        !history.some((msg: any) => msg.id === live.id)
    );
    return [...history, ...live];
  }, [chat?.messages, liveMessages]);

  const groupedMessages = useMemo(() => {
    const groups: { date: string; messages: any[] }[] = [];

    allMessages.forEach((message) => {
      const messageDate = format(new Date(message.created_at), "yyyy-MM-dd");
      const existingGroup = groups.find((group) => group.date === messageDate);

      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        groups.push({ date: messageDate, messages: [message] });
      }
    });

    return groups;
  }, [allMessages]);

  const handleSend = () => {
    if (input.trim()) {
      const payload = {
        messageId: Date.now(),
        message: input,
        chatId: chat?.id,
      };

      send(payload);
      setInput("");
    }
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  return (
    <div className="w-full pt-6 border border-gray-300 bg-gray-100 rounded-lg flex flex-col">
      <div className="flex justify-center items-center space-x-4 p-4">
        <div className="w-48 h-0.5 bg-black"></div>
        <div className="rounded-full border border-black py-2 px-4 text-black">
          {chat?.claimed_admin ? (
            <>
              Responding:{" "}
              {chat.claimed_admin.first_name || chat.claimed_admin.email}
            </>
          ) : (
            "No admin claimed"
          )}
        </div>
        <div className="w-48 h-0.5 bg-black"></div>
      </div>

      {loadingChat ? (
        <div className="text-center text-gray-500">Loading messages...</div>
      ) : (
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Date Separator */}
              <div className="text-center text-sm text-gray-600 font-medium">
                {format(new Date(group.date), "EEEE, do MMMM yyyy")}
              </div>
              {/* Messages */}
              {group.messages.map((mes: any, index: any) => {
                const isUser = chat?.user_info?.id === mes.sender_info?.id;
                return (
                  <div
                    key={index}
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                    ref={
                      groupIndex === groupedMessages.length - 1 &&
                      index === group.messages.length - 1
                        ? lastMessageRef
                        : null
                    }
                  >
                    <div className="space-y-1 max-w-[80%]">
                      <div
                        className={`py-3 px-4 text-sm font-medium rounded-xl shadow-md ${
                          isUser
                            ? "bg-gray-200 text-black"
                            : "bg-[#023E8A] text-white"
                        }`}
                      >
                        {mes.content || mes.message}
                      </div>
                      <span
                        className={`block text-xs text-gray-500 ${
                          isUser ? "text-right" : "text-left"
                        }`}
                      >
                        {format(new Date(mes.created_at), "h:mm a")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      <div className="p-4 border-t flex items-center gap-4">
        {chat?.status === "resolved" ? (
          <p className="text-center w-full text-gray-500">
            This chat has been marked as resolved
          </p>
        ) : (
          <>
            <div className="bg-gray-200 flex-1 p-3 border rounded-lg flex items-center space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 outline-none bg-transparent"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && chat?.status !== "resolved") {
                    handleSend();
                  }
                }}
                disabled={chat?.status === "CLOSED"}
              />
            </div>
            <button
              onClick={handleSend}
              className={`p-3 rounded-lg ${
                chat?.status === "CLOSED"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#023E8A] text-white"
              }`}
              disabled={chat?.status === "resolved"}
            >
              Send
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
