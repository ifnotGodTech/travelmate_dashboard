import { useState, useEffect, useRef } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";
import useWebSocket from "react-use-websocket";
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
  const hasFetched = useRef(false); // Prevent multiple API calls

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
    if (initalFetch && !hasFetched.current) {
      hasFetched.current = true; // Mark as fetched
      fetchTickets();
    }
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

export const useWebSocketService = (sessionId: number) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [socketUrl, setSocketUrl] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null); // WebSocket instance

  useEffect(() => {
    getFromLocalStorage({
      key: "TRAVELMATE_APP_PERSISTOR",
      cb: (value: { accessToken: string; refreshToken: string }) => {
        setAccessToken(value?.accessToken || null);
      },
    });
  }, []);

  useEffect(() => {
    if (accessToken && sessionId) {
      const url = `wss://travelmate-backend-0suw.onrender.com/ws/chat/${sessionId}/?token=${accessToken}`;
      setSocketUrl(url);
    }

    return () => {
      // Cleanup previous WebSocket when sessionId changes or component unmounts
      if (socket) {
        socket.close();
      }
    };
  }, [accessToken, sessionId]);

  useEffect(() => {
    if (socketUrl) {
      const ws = new WebSocket(socketUrl);

      ws.onopen = () => console.log("WebSocket connected");
      ws.onerror = (error) => console.error("WebSocket error:", error);
      ws.onclose = (event) => {
        console.error("WebSocket closed unexpectedly:", event);
        setTimeout(() => console.log("Reconnecting WebSocket..."), 3000);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prev) => {
          if (!prev.some((msg) => msg.id === data.id)) {
            return [...prev, data];
          }
          return prev;
        });
      };

      setSocket(ws);

      return () => {
        // Close the WebSocket when the component unmounts or the session changes
        ws.close();
      };
    }
  }, [socketUrl]);

  const send = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return { messages, send };
};
