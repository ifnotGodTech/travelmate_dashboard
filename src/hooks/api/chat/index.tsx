import { useState, useEffect } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";
import ChatService from "@/services/chat";

type ChatResponse = {
  id: number;
  user: number;
  user_info: {
    id: number;
    first_name: string;
    email: string;
  };
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
  assigned_admin: number;
  admin_info: {
    id: number;
    first_name: string;
    email: string;
  };
  unread_count: string;
  last_message: string;
};

export function useGetAllChat({
  initalFetch = true,
  successCallback,
  errorCallback,
}: {
  initalFetch?: boolean;
  successCallback?: (message: string) => void;
  errorCallback?: (props: { message?: string; description?: string }) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [nextPage, setNextPage] = useState<string | null>(null); // Track next page URL

  const fetchTickets = async (url?: string) => {
    setLoading(true);
    try {
      const res = await ChatService.getAllChats(url);
      setData((prev: any) => [...prev, ...res.data.results]);
      setNextPage(res.data.next);
      if (successCallback) successCallback("Tickets fetched successfully.");
    } catch (error: any) {
      if (errorCallback)
        errorCallback({
          message: "An error occurred while fetching tickets",
          description: error?.message || "Unknown error",
        });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (nextPage) fetchTickets(nextPage);
  };

  useEffect(() => {
    if (initalFetch) fetchTickets();
  }, [initalFetch]);

  return { loading, data, nextPage, loadMore };
}

export const useGetChatMessages = () => {
  const [loadingMessage, setLoading] = useState(false);
  const [messages, setData] = useState<any>({});

  const onFetchMessages = async ({ id }: { id: number }) => {
    try {
      setLoading(true);
      const res = await ChatService.getChatMessages({ id });
      setData(res.data);
    } catch (error: any) {
      showErrorToast({
        message: "An error occurred while fetching messages",
        description: error?.message || "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loadingMessage, messages, onFetchMessages };
};
