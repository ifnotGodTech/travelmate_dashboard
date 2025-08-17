"use client";

import NotificationService from "@/services/notification";
import { useState, useEffect, useCallback, useRef } from "react";

type NotificationStatus = "read" | "unread" | "all";

interface FetchParams {
  page?: number;
  status?: NotificationStatus;
  startDate?: string;
  endDate?: string;
}

export function useGetAllNotifications({
  initialFetch = true,
  initialParams = {},
}: {
  initialFetch?: boolean;
  initialParams?: FetchParams;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [params, setParams] = useState<FetchParams>(initialParams);

  // Prevents double-fetch on mount in React StrictMode
  const didMountRef = useRef(false);

  const fetchData = useCallback(
    async (
      urlOrParams?: string | FetchParams,
      options?: { silent?: boolean }
    ) => {
      if (!options?.silent) {
        setLoading(true);
      }
      try {
        let res;
        if (typeof urlOrParams === "string") {
          res = await NotificationService.getAllNotificationByUrl(urlOrParams);
        } else {
          const query = { ...params, ...urlOrParams };
          res = await NotificationService.getAllNotification(query);
          // only update params if they actually change
          setParams((prev) =>
            JSON.stringify(prev) === JSON.stringify(query) ? prev : query
          );
        }

        setData(res.data.results);
        setCount(res.data.count);
        setNext(res.data.next);
        setPrevious(res.data.previous);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        if (!options?.silent) {
          setLoading(false);
        }
      }
    },
    [params]
  );

  // Only run once on mount if initialFetch is true
  useEffect(() => {
    if (initialFetch && !didMountRef.current) {
      fetchData();
      didMountRef.current = true;
    }
  }, [initialFetch, fetchData]);

  // Public API
  const refresh = useCallback(
    (opts?: { silent?: boolean }) => fetchData(undefined, opts),
    [fetchData]
  );

  const goToNextPage = useCallback(
    (opts?: { silent?: boolean }) => next && fetchData(next, opts),
    [next, fetchData]
  );

  const goToPreviousPage = useCallback(
    (opts?: { silent?: boolean }) => previous && fetchData(previous, opts),
    [previous, fetchData]
  );

  const filterByStatus = useCallback(
    (status: NotificationStatus, opts?: { silent?: boolean }) =>
      fetchData({ page: 1, status }, opts),
    [fetchData]
  );

  const filterByDate = useCallback(
    (startDate?: string, endDate?: string, opts?: { silent?: boolean }) =>
      fetchData({ page: 1, startDate, endDate }, opts),
    [fetchData]
  );

  return {
    loading,
    data,
    count,
    next,
    previous,
    refresh,
    goToNextPage,
    goToPreviousPage,
    filterByStatus,
    filterByDate,
    setParams,
  };
}

export const useMarkAsRead = () => {
  const [loading, setLoading] = useState(false);

  const markAsRead = async (ids: number[], onSuccess?: () => void) => {
    setLoading(true);
    try {
      NotificationService.markNotificationAsRead({ ids });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    } finally {
      setLoading(false);
    }
  };

  return { markAsRead, loading };
};

export const useDeleteNotifications = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (notificationIds: string[]) => {
    setLoading(true);
    setError(null);

    try {
      await NotificationService.deleteNotification({ ids: notificationIds });
      setLoading(false);
      return true; // success
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete notifications");
      setLoading(false);
      return false; // failure
    }
  };

  return { handleDelete, loading, error };
};
