"use client";
import { useState, useEffect, useRef } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";
import UserService from "@/services/user";
import axios from "axios";

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
}

interface UsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

export const useGetUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const fetchUsers = async (url?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await UserService.getAllUser(url);
      const data: UsersResponse = response.data;

      setUsers((prevUsers) => [...prevUsers, ...data.results]);
      setNextPageUrl(data.next);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchUsers();
      hasFetched.current = true;
    }
  }, []);

  const loadMore = () => {
    if (nextPageUrl) fetchUsers(nextPageUrl);
  };

  return { users, loadMore, loading, error, nextPageUrl };
};

export const useUserBookings = (userId: string) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) return; // Ensure userId is provided
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://travelmate-backend-0suw.onrender.com/api/user/bookings/`,
          {
            params: { user_id: userId },
          }
        );
        setBookings(response.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array ensures it runs only on mount

  return { bookings, isLoading, error };
};

export const useDeactivateUser = () => {
  const [deactivating, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onDeactivateUser = async ({
    email,
    userId,
    successCallback,
  }: {
    email: string;
    userId: any;
    successCallback?: () => void;
  }) => {
    setLoading(true);
    setIsSuccess(false); // Reset success state before the API call
    try {
      const res = await UserService.deactivateUser({ userId, email });
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
  }: {
    successCallback?: () => void;
  }) => {
    setLoading(true);
    setIsSuccess(false);
    try {
      const res = await UserService.exportCSV();
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

  return { exporting, onExportCSV, isSuccess };
};
