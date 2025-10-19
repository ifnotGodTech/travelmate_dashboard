"use client";

import NotificationService from "@/services/notification";
import { useState, useEffect, useCallback, useRef } from "react";
import instance from "@/hooks/initializers/useAxiosDefaults";
import { showSuccessToast, showErrorToast } from "@/utils/toasters";
import { getCookies } from "@/context/Auth-Cookies";

type NotificationStatus = "read" | "unread" | "all";

interface FetchParams {
  page?: number;
  status?: NotificationStatus;
  startDate?: string;
  endDate?: string;
}

export const useGetAllNotifications = () => {
  const BASE_URL =
    "https://travelmate-backend-0suw.onrender.com/api/notifications/";

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isRead, setIsRead] = useState<boolean | null>(null); // ✅ read/unread filter
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const hasFetchedInitial = useRef(false);

  // build query url with filters
  const buildUrl = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (isRead !== null) params.append("is_read", String(isRead));
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    return `${BASE_URL}${params.toString() ? `?${params.toString()}` : ""}`;
  };

  // fetch data
  const fetchNotifications = async (url?: string, reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = url || buildUrl();
      const response = await instance.get(endpoint);
      const data = response.data;

      setNotifications((prev) =>
        reset ? data.results : [...prev, ...data.results]
      );
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  // initial fetch
  useEffect(() => {
    if (!hasFetchedInitial.current) {
      fetchNotifications(undefined, true);
      hasFetchedInitial.current = true;
    }
  }, []);

  // refetch when filters change
  useEffect(() => {
    fetchNotifications(undefined, true);
  }, [searchTerm, isRead, startDate, endDate]);

  const loadNext = () => {
    if (nextPageUrl) fetchNotifications(nextPageUrl, false);
  };

  const loadPrevious = () => {
    if (previousPageUrl) fetchNotifications(previousPageUrl, false);
  };

  const refetch = () => {
    fetchNotifications(undefined, true);
  };

  return {
    notifications,
    loading,
    error,
    nextPageUrl,
    previousPageUrl,
    loadNext,
    loadPrevious,
    setSearchTerm,
    setIsRead, // ✅ now you can filter read/unread
    setStartDate,
    setEndDate,
    refetch,
  };
};

export const useMarkAsRead = () => {
  const [loading, setLoading] = useState(false);

  const markAsRead = async (
    ids: string | string[],
    successCallback?: () => void
  ) => {
    setLoading(true);
    try {
      const res = await NotificationService.markNotificationAsRead(ids);

      if (res.status === 200) {
        const { message = "🚀 Notification marked as read", description = "" } =
          res.data || {};

        showSuccessToast({ message, description });
        if (successCallback) successCallback();
      }
    } catch (error: any) {
      showErrorToast({
        message: "Unable to mark as read at the moment!",
      });
    } finally {
      setLoading(false);
    }
  };

  return { markAsRead, loading };
};

export const useDeleteNotification = () => {
  const [loading, setLoading] = useState(false);

  const deleteNotification = async (
    ids: string | string[],
    successCallback?: () => void
  ) => {
    setLoading(true);
    try {
      const res = await NotificationService.deleteNotification(ids);

      if (res.status === 200) {
        const {
          message = "🚀 Notification deleted successfully",
          description = "",
        } = res.data || {};

        showSuccessToast({ message, description });
        if (successCallback) successCallback();
      }
    } catch (error: any) {
      showErrorToast({
        message: "Unable to delete notification at the moment!",
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteNotification, loading };
};

export const useWebSocketService = (accessToken: string | null) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  
  useEffect(() => {
    if (!accessToken) return;

    // Attach access token as query param
    const url = `wss://travelmate-backend-0suw.onrender.com/ws/notifications/?authorization=${accessToken}`;
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => {
          // Avoid duplicates
          if (!prev.some((msg) => msg.id === data.id)) {
            return [...prev, data];
          }
          return prev;
        });
      } catch (err) {
        console.error("Invalid WS message:", err);
      }
    };

    ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.warn("⚠️ WebSocket closed:", event.reason);
      // Reconnect after 3s
      setTimeout(() => {
        console.log("🔄 Reconnecting WebSocket...");
        setSocket(new WebSocket(url));
      }, 3000);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [accessToken]);

  const send = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return { messages, send, socket };
};

