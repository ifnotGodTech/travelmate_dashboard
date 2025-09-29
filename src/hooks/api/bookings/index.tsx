"use client"
import { useState, useEffect, useCallback } from "react";
import instance from "@/hooks/initializers/useAxiosDefaults";
import BookingService from "@/services/booking";

export const useGetAllBookings = (filters: any = {}) => {
  const BASE_URL =
    "https://travelmate-backend-0suw.onrender.com/api/bookings/admin/list/";

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add default filter for "stays" if no booking_type is provided
  const defaultFilters = {
    booking_type: "stays",
    ...filters,
  };

  // Fetch function
  const fetchBookings = useCallback(
    async (url?: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await instance.get<any>(
          url || BASE_URL,
          url ? {} : { params: defaultFilters }
        );
        setData(response.data.results.results);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    },
    [BASE_URL, JSON.stringify(defaultFilters)]
  );

  // Initial + refetch on filter change
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Pagination functions
  const loadNext = useCallback(() => {
    if (data?.next) fetchBookings(data.next);
  }, [data?.next, fetchBookings]);

  const loadPrevious = useCallback(() => {
    if (data?.previous) fetchBookings(data.previous);
  }, [data?.previous, fetchBookings]);

  // Function to update filters
  const setFilters = useCallback((newFilters: any) => {
    // This will be handled by the component re-calling the hook with new filters
    // The component should manage filter state and pass updated filters to this hook
  }, []);

  return {
    data,
    loading,
    error,
    setFilters,
    loadNext,
    loadPrevious,
    hasNext: Boolean(data?.next),
    hasPrevious: Boolean(data?.previous),
  };
};

export function useGetBooking({
  bookingRef,
  initalFetch = true,
  successCallback,
  errorCallback,
}: {
  bookingRef?: string;
  initalFetch?: boolean;
  successCallback?: (message: string) => void;
  errorCallback?: (props: { message?: string; description?: string }) => void;
}) {
  const [loadingBooking, setLoading] = useState(false);
  const [booking, setData] = useState<any>(null);

  const fetchBooking = async () => {
    if (!bookingRef) return;
    setLoading(true);
    try {
      const res = await BookingService.getSingleBooking({ bookingRef });
      setData(res.data);
      if (successCallback) successCallback("Booking fetched successfully.");
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
    if (initalFetch) fetchBooking();
  }, [initalFetch, bookingRef]);

  return { loadingBooking, booking };
}
