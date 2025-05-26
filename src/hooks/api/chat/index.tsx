import { useState, useEffect, useRef, useCallback } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";
import useWebSocket from "react-use-websocket";
import ChatService from "@/services/chat";
import axios from "axios";

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

type Chat = {
  id: string;
  status: string;
  [key: string]: any;
};

export function useGetAllChat() {
  const BASE_URL =
    "https://travelmate-backend-0suw.onrender.com/api/admin/chats/";

  const [chats, setChats] = useState<Chat[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<Record<string, any>>({});
  const hasFetchedInitial = useRef(false);
  const isFetching = useRef(false); // Prevent redundant fetches

  // Build URL with filters
  const buildUrl = useCallback(() => {
    const params = new URLSearchParams(filters);
    return `${BASE_URL}${params.toString() ? `?${params.toString()}` : ""}`;
  }, [filters]);

  // Fetch chats function (memoized)
  const fetchChats = useCallback(
    async (url?: string) => {
      if (isFetching.current) return; // Prevent redundant fetching
      isFetching.current = true;

      try {
        setLoading(true);
        setError(null);

        const endpoint = url || buildUrl();
        const response = await axios.get(endpoint);
        const data: { results: Chat[]; next: string | null } = response.data;

        setChats((prevChats) =>
          url ? [...prevChats, ...data.results] : data.results
        );
        setNextPageUrl(data.next);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    },
    [buildUrl]
  );

  // Set filters with deep comparison to prevent redundant updates
  const setFilters = (newFilters: Record<string, any>) => {
    setFiltersState((prevFilters) => {
      const prevString = JSON.stringify(prevFilters);
      const newString = JSON.stringify(newFilters);
      return prevString === newString ? prevFilters : newFilters;
    });
  };

  // Initial fetch on mount
  useEffect(() => {
    if (!hasFetchedInitial.current) {
      fetchChats();
      hasFetchedInitial.current = true;
    }
  }, [fetchChats]);

  // Fetch chats when filters change
  useEffect(() => {
    if (hasFetchedInitial.current) {
      fetchChats();
    }
  }, [filters, fetchChats]);

  // Load next page
  const loadNext = useCallback(() => {
    if (nextPageUrl) fetchChats(nextPageUrl);
  }, [nextPageUrl, fetchChats]);

  return {
    chats,
    loadNext,
    loading,
    error,
    nextPageUrl,
    setFilters,
  };
}

export function useGetChat({
  ChatId,
  initialFetch = true,
  successCallback,
  errorCallback,
}: {
  ChatId?: string;
  initialFetch?: boolean;
  successCallback?: (message: string) => void;
  errorCallback?: (props: { message?: string; description?: string }) => void;
}) {
  const [loadingChat, setLoading] = useState(false);
  const [chat, setChat] = useState<any | null>(null);

  const fetchChat = async () => {
    if (!ChatId) return;

    setLoading(true);
    try {
      const res = await ChatService.getChat({ id: ChatId });
      setChat(res.data);
      if (successCallback) successCallback("Chat fetched successfully.");
    } catch (error: any) {
      if (errorCallback) {
        errorCallback({
          message: "An error occurred while fetching the chat.",
          description: error?.message || "Unknown error.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialFetch) fetchChat();
  }, [initialFetch, ChatId]);

  return { loadingChat, chat };
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
  // console.log(messages);

  const send = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return { messages, send };
};

export function useClaimChat() {
  const [claiming, setClaiming] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onClaiming = async ({
    ChatId,
    successCallback,
  }: {
    ChatId: string;
    successCallback?: () => void;
  }) => {
    setClaiming(true);
    setIsSuccess(false);

    try {
      const res = await ChatService.claimChat({ id: ChatId });
      const message = res.data?.detail || "Chat claimed successfully";
      showSuccessToast({ message });

      if (successCallback) {
        successCallback();
      }

      setIsSuccess(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Unable to respond to claim at the moment!";
      showErrorToast({ message: errorMessage });
    } finally {
      setClaiming(false);
    }
  };

  return { claiming, onClaiming, isSuccess };
}
