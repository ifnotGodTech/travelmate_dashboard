import { useState, useEffect, useRef } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";
import ChatService from "@/services/chat";
const getFromLocalStorage = ({
  key,
  cb = () => null,
}: {
  key: string;
  cb?: (value: any) => void;
}): void => {
  try {
    const value = localStorage?.getItem(key);
    if (value) {
      const parsedValue = JSON.parse(value);
      if (typeof cb === "function") cb(parsedValue);
    }
  } catch (e) {
    console.error("Error accessing localStorage:", e);
  }
};

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

export const useWebSocket = (sessionId: number) => {
  const [messages, setMessages] = useState<any[]>([]); // Store incoming messages
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Fetch access token from TRAVELMATE_APP_PERSISTOR in localStorage
    let accessToken: string | null = null;
    getFromLocalStorage({
      key: "TRAVELMATE_APP_PERSISTOR",
      cb: (value: { accessToken: string; refreshToken: string }) => {
        accessToken = value?.accessToken || null;
      },
    });

    if (!accessToken) {
      console.error("Access token is missing.");
      return;
    }

    // Establish WebSocket connection
    const wsUrl = `wss://travelmate-backend-0suw.onrender.com/ws/chat/${sessionId}/?token=${accessToken}`;
    socketRef.current = new WebSocket(wsUrl);

    const socket = socketRef.current;

    // Handle WebSocket events
    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    // Cleanup WebSocket on unmount
    return () => {
      socket.close();
    };
  }, [sessionId]);

  // Function to send a message
  const sendMessage = (message: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { messages, sendMessage };
};
