"use client"
import { useState, useEffect } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";
import UserService from "@/services/user";

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
    fetchUsers();
  }, []);

  const loadMore = () => {
    if (nextPageUrl) fetchUsers(nextPageUrl);
  };

  return { users, loadMore, loading, error };
};
