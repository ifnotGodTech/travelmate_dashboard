"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/router";

type Chat = {
  name: string;
  message: string;
  time: string;
  status: string;
  date: string;
  number: number;
};

interface ChatContextType {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};