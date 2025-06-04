"use client";
import { useState, useEffect, useRef } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";
import UserService from "@/services/user";
import axios from "axios";
import env from "@/config/env";

export function useGetUser({
  UserId,
  initalFetch = true,
  successCallback,
  errorCallback,
}: {
  UserId?: string;
  initalFetch?: boolean;
  successCallback?: (message: string) => void;
  errorCallback?: (props: { message?: string; description?: string }) => void;
}) {
  console.log("fetching...", UserId);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);

  const fetchUser = async () => {
    if (!UserId) return;
    setLoading(true);
    try {
      const res = await UserService.getUser({ UserId });
      setData(res.data);
      if (successCallback)
        successCallback("User Profile fetched successfully.");
    } catch (error: any) {
      if (errorCallback)
        errorCallback({
          message: "An error occurred while fetching the ticket",
          description: error?.message || "Unknown error",
        });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initalFetch) fetchUser();
  }, [initalFetch, UserId]);

  return { loading, data };
}

interface User {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  name: string;
  profile_picture: string;
  date_created: string;
  total_bookings: number;
  is_active: boolean;
  reason: string;
  deleted_at: string;
}

interface UsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

export const useGetUsers = () => {
  const BASE_URL = "https://travelmate-backend-0suw.onrender.com/api/superuser";

  const [users, setUsers] = useState<User[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isActive, setIsActive] = useState<string | null>(null);

  // New states for date filter
  const [dateJoinedAfter, setDateJoinedAfter] = useState<string | null>(null);
  const [dateJoinedBefore, setDateJoinedBefore] = useState<string | null>(null);

  const hasFetchedInitial = useRef(false);

  const buildUrl = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (isActive !== null) params.append("is_active", isActive);
    if (dateJoinedAfter) params.append("date_joined_after", dateJoinedAfter);
    if (dateJoinedBefore) params.append("date_joined_before", dateJoinedBefore);

    return `${BASE_URL}${params.toString() ? `?${params.toString()}` : ""}`;
  };

  const fetchUsers = async (url?: string, reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = url || buildUrl();
      const response = await axios.get(endpoint);
      const data: UsersResponse = response.data;

      setUsers(reset ? data.results : [...users, ...data.results]);
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

  // Fetch initial data once
  useEffect(() => {
    if (!hasFetchedInitial.current) {
      fetchUsers(undefined, true);
      hasFetchedInitial.current = true;
    }
  }, []);

  // Refetch when filters change
  useEffect(() => {
    fetchUsers(undefined, true);
  }, [searchTerm, isActive, dateJoinedAfter, dateJoinedBefore]);

  const loadNext = () => {
    if (nextPageUrl) fetchUsers(nextPageUrl, true);
  };

  const loadPrevious = () => {
    if (previousPageUrl) fetchUsers(previousPageUrl, true);
  };

  return {
    users,
    loadNext,
    loadPrevious,
    loading,
    error,
    nextPageUrl,
    previousPageUrl,
    setSearchTerm,
    setIsActive,
    // expose setters for date filters
    setDateJoinedAfter,
    setDateJoinedBefore,
  };
};

export const useGetDeletedUsers = () => {
  const BASE_URL =
    "https://travelmate-backend-0suw.onrender.com/api/superuser/soft-deleted-users/";

  const [users, setUsers] = useState<User[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isActive, setIsActive] = useState<string | null>(null);

  const hasFetchedInitial = useRef(false);

  const buildUrl = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (isActive !== null) params.append("is_active", isActive);

    return `${BASE_URL}${params.toString() ? `?${params.toString()}` : ""}`;
  };

  const fetchUsers = async (url?: string, reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = url || buildUrl();
      const response = await axios.get(endpoint);
      const data: UsersResponse = response.data;

      // Replace the users list if reset === true, else append
      setUsers(reset ? data.results : [...users, ...data.results]);
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

  // Fetch initial data once
  useEffect(() => {
    if (!hasFetchedInitial.current) {
      fetchUsers(undefined, true);
      hasFetchedInitial.current = true;
    }
  }, []);

  // Refetch when searchTerm or isActive changes
  useEffect(() => {
    fetchUsers(undefined, true);
  }, [searchTerm, isActive]);

  // Load next page and replace user list
  const loadNext = () => {
    if (nextPageUrl) fetchUsers(nextPageUrl, true);
  };

  // Load previous page and replace user list
  const loadPrevious = () => {
    if (previousPageUrl) fetchUsers(previousPageUrl, true);
  };

  return {
    users,
    loadNext,
    loadPrevious,
    loading,
    error,
    nextPageUrl,
    previousPageUrl,
    setSearchTerm,
    setIsActive,
  };
};

export const useDeactivateUser = () => {
  const [deactivating, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onDeactivateUser = async ({
    payload,
    userId,
    successCallback,
  }: {
    payload: { email: string; reason?: string; additional_note?: string };
    userId: any;
    successCallback?: () => void;
  }) => {
    setLoading(true);
    setIsSuccess(false);

    const data = {
      additional_reason: payload.additional_note,
      reason_choices: payload.reason,
    };

    try {
      const res = await UserService.deactivateUser({ userId, data });
      const {
        message = res.data.Message || "🚀 User Deactivated successfully",
        description = "",
      } = res.data || {};

      showSuccessToast({ message, description });

      try {
        successCallback?.();
      } catch (callbackError) {
        console.error("Error in successCallback:", callbackError);
      }

      setIsSuccess(true);
    } catch (error: any) {
      showErrorToast({
        message: "unable to deactivate user at the moment",
      });
    } finally {
      setLoading(false);
    }
  };

  return { deactivating, onDeactivateUser, isSuccess };
};

export const useExportCSV = () => {
  const [exporting, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onExportCSV = async ({
    successCallback,
    errorCallback,
  }: {
    successCallback?: () => void;
    errorCallback?: (error: Error) => void;
  }) => {
    setLoading(true);
    setIsSuccess(false);

    try {
      const res = await UserService.exportCSV();
      const blob = new Blob([res.data], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      successCallback?.();
      setIsSuccess(true);

      showSuccessToast({
        message: "CSV Export Successful",
        description: "The user data has been exported to CSV format.",
      });
    } catch (error: any) {
      console.error("Error exporting CSV:", error);

      showErrorToast({
        message: "Export Failed",
        description: "An error occurred while exporting the CSV.",
      });

      errorCallback?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { exporting, onExportCSV, isSuccess };
};

export const useDeleteUser = () => {
  const [deleting, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onDeleteUser = async ({
    userId,
    successCallback,
  }: {
    userId: any;
    successCallback?: () => void;
  }) => {
    setLoading(true);
    setIsSuccess(false);

    try {
      const res = await UserService.deleteUser({ userId });
      const {
        message = res.data.Message || "🚀 User Deleted successfully",
        description = "",
      } = res.data || {};

      showSuccessToast({ message, description });

      try {
        successCallback?.();
      } catch (callbackError) {
        console.error("Error in successCallback:", callbackError);
      }

      setIsSuccess(true);
    } catch (error: any) {
      showErrorToast({
        message: "unable to deactivate user at the moment",
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleting, onDeleteUser, isSuccess };
};

export const useBulkDeleteUser = () => {
  const [deleting, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onBulkDeleteUser = async ({
    userIds,
    successCallback,
  }: {
    userIds: number[];
    successCallback?: () => void;
  }) => {
    setLoading(true);
    setIsSuccess(false);

    try {
      const res = await UserService.bulkDeleteUser({ userIds });
      const {
        message = res.data.Message || "🚀 Users deleted successfully",
        description = "",
      } = res.data || {};

      showSuccessToast({ message, description });

      try {
        successCallback?.();
      } catch (callbackError) {
        console.error("Error in successCallback:", callbackError);
      }

      setIsSuccess(true);
    } catch (error: any) {
      showErrorToast({
        message: "Unable to delete users at the moment",
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleting, onBulkDeleteUser, isSuccess };
};
