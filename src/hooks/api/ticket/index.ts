import { useState, useEffect, useRef } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";
import TicketService from "@/services/ticket";

export interface User {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
}

export interface Ticket {
  id: number;
  title: string;
  ticket_id: string;
  category: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: User;
  messages: any[];
  escalated: boolean;
  escalation_level: string | null;
  escalation_reason: string | null;
  escalation_response_time: string | null;
  escalation_note: string | null;
}

interface Level {
  id: number;
  name: string;
  email: string;
}

export function useGetAllTicket({
  initalFetch = true,
  successCallback,
  errorCallback,
}: {
  initalFetch?: boolean;
  successCallback?: (message: string) => void;
  errorCallback?: (props: { message?: string; description?: string }) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Ticket[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null); // Track next page URL
  const hasFetched = useRef(false); // Prevent multiple API calls

  const fetchTickets = async (url?: string) => {
    setLoading(true);
    try {
      const res = await TicketService.getTickets(url); // Pass optional URL for pagination
      setData((prev) => [...prev, ...res.data.results]); // Append new results to existing data
      setNextPage(res.data.next); // Update the next page URL
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
      hasFetched.current = true; // Mark as fetched to prevent multiple calls
      fetchTickets();
    }
  }, [initalFetch]);

  return { loading, data, nextPage, loadMore };
}

export function useGetTicket({
  TicketId,
  initalFetch = true,
  successCallback,
  errorCallback,
}: {
  TicketId?: string;
  initalFetch?: boolean;
  successCallback?: (message: string) => void;
  errorCallback?: (props: { message?: string; description?: string }) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Ticket | null>(null);

  const fetchTicket = async () => {
    if (!TicketId) return;
    setLoading(true);
    try {
      const res = await TicketService.getTicket({ TicketId });
      setData(res.data);
      if (successCallback) successCallback("Ticket fetched successfully.");
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
    if (initalFetch) fetchTicket();
  }, [initalFetch, TicketId]);

  return { loading, data };
}

export function useGetAllEscalationLevel({
  initalFetch = true,
  refresh = false,
}: {
  initalFetch?: boolean;
  refresh?: boolean;
}) {
  const [Levelloading, setLoading] = useState(false);
  const [Leveldata, setData] = useState<any | null>(null);

  const onEscalationLevel = async () => {
    setLoading(true);
    try {
      const res = await TicketService.getEscalationLevel();
      setData(res.data);
    } catch (error) {
      console.error("Error fetching escalation levels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initalFetch || refresh) onEscalationLevel();
  }, [initalFetch, refresh]);

  return { Levelloading, Leveldata };
}

export function useGetAllEscalationReasons({
  initalFetch = true,
  refresh = false,
}: {
  initalFetch?: boolean;
  refresh?: boolean;
}) {
  const [Reasonsloading, setLoading] = useState(false);
  const [Reasonsdata, setData] = useState<any | null>(null);

  const onEscalationReason = async () => {
    setLoading(true);
    try {
      const res = await TicketService.getEscalationReasons();
      setData(res.data);
    } catch (error) {
      console.error("Error fetching escalation levels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initalFetch || refresh) onEscalationReason();
  }, [initalFetch, refresh]);

  return { Reasonsloading, Reasonsdata };
}

type TEscalate = {
  escalation_level: number;
  escalation_reason: number;
  escalation_note: string;
  escalation_response_time: string;
};

export const useEscalateTicket = () => {
  const [escalating, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onEscalateTicket = async ({
    TicketId,
    payload,
    successCallback,
  }: {
    TicketId: string;
    payload: TEscalate;
    successCallback?: () => void;
  }) => {
    setLoading(true);
    setIsSuccess(false);
    try {
      const res = await TicketService.escalateTicket({ TicketId, payload });
      const message = res.data.detail;

      showSuccessToast({ message });

      try {
        successCallback?.();
      } catch (callbackError) {
        console.error("Error in successCallback:", callbackError);
      }

      setIsSuccess(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Unable to escalate ticket at the moment!";
      showErrorToast({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return { escalating, onEscalateTicket, isSuccess };
};

export type TEscalationPayload = {
  name: string;
  description: string;
  email: string;
};

export const useCreateEscalationLevel = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onEsccalationLevel = async ({
    TicketId,
    payload,
    successCallback,
  }: {
    TicketId: string;
    payload: TEscalationPayload;
    successCallback?: () => void;
  }) => {
    setLoading(true);
    setIsSuccess(false);
    try {
      const res = await TicketService.createEscalationLevel({ payload });
      const message = res.data.detail || "Escalation level added successfully.";

      showSuccessToast({ message });

      successCallback?.();
      setIsSuccess(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Unable to add escalation level at the moment.!";
      showErrorToast({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return { loading, onEsccalationLevel, isSuccess };
};

type TRespond = {
  content: string;
  attachment?: File;
};

export const useRespondToTicket = () => {
  const [responding, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onRespondToTicket = async ({
    TicketId,
    payload,
    successCallback,
  }: {
    TicketId: string;
    payload: FormData;
    successCallback?: () => void;
  }) => {
    setLoading(true);
    setIsSuccess(false);
    try {
      const res = await TicketService.respondToTicket({ TicketId, payload });
      const message = res.data.detail || "Ticket response sent sucessfully";

      showSuccessToast({ message });

      try {
        successCallback?.();
      } catch (callbackError) {
        console.error("Error in successCallback:", callbackError);
      }

      setIsSuccess(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Unable to respond to ticket at the moment!";
      showErrorToast({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return { responding, onRespondToTicket, isSuccess };
};

export function useGetAllTicketStats({
  initialFetch = true,
  defaultDays = 7,
  successCallback,
  errorCallback,
}: {
  initialFetch?: boolean;
  defaultDays?: number;
  successCallback?: (message: string) => void;
  errorCallback?: (props: { message?: string; description?: string }) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [days, setDays] = useState<number>(defaultDays);

  const fetchTicketsStats = async () => {
    setLoading(true);
    try {
      const response = await TicketService.getTicketsStats({ days });
      setData(response.data);
      successCallback?.("Tickets fetched successfully.");
    } catch (error: any) {
      console.error("Error fetching tickets:", error);
      errorCallback?.({
        message: "An error occurred while fetching tickets",
        description: error?.message || "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateDays = (newDays: number) => {
    if (newDays !== days) {
      setDays(newDays);
      fetchTicketsStats(); // Fetch data with the updated days
    }
  };

  useEffect(() => {
    if (initialFetch) fetchTicketsStats();
  }, [initialFetch, days]);

  return {
    loading,
    data,
    updateDays,
    fetchTicketsStats,
  };
}
