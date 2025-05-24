import axios from "axios";
import env from "@/config/env";

type TEscalateTicket = {
  escalation_level: number;
  escalation_reason: number;
  escalation_note: string;
  escalation_response_time: string;
};
type TEscalationPayload = {
  name: string;
  description: string;
  email: string;
};

class Service {
  // TicketService with filter and search
  getTickets({
    url,
    filters,
  }: {
    url?: string;
    filters?: Record<string, any>;
  }) {
    const endpoint = url || env.api.ticket;
    const queryString = new URLSearchParams(filters).toString(); // Convert filters object to query string
    const fullUrl = queryString ? `${endpoint}?${queryString}` : endpoint;
    return axios.get(fullUrl);
  }

  getTicketsStats = ({ days }: { days?: number }) => {
    const endpoint = `${env.api.ticket}all_stats/`;
    const params = days ? `?days=${days}` : "";
    return axios.get(`${endpoint}${params}`);
  };

  getTicket({ TicketId }: { TicketId?: string }) {
    return axios.get(env.api.ticket + TicketId + "/");
  }

  claimTicket({ TicketId }: { TicketId?: string }) {
    return axios.post(env.api.ticket + TicketId + "/claim/");
  }

  getEscalationLevel() {
    return axios.get(env.api.escalation + "/");
  }
  createEscalationLevel({ payload }: { payload: TEscalationPayload }) {
    return axios.post(env.api.escalation + "/", payload);
  }

  getEscalationReasons() {
    return axios.get(env.api.admin + "/escalation-reasons/");
  }

  escalateTicket({
    TicketId,
    payload,
  }: {
    TicketId: string;
    payload: TEscalateTicket;
  }) {
    return axios.post(env.api.ticket + TicketId + "/escalate/", payload);
  }

  respondToTicket({
    TicketId,
    payload,
  }: {
    TicketId: string;
    payload: FormData;
  }) {
    return axios.post(env.api.ticket + TicketId + "/messages/", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  resolveTicket(TicketId: string) {
    return axios.post(`${env.api.ticket}${TicketId}/resolve/`);
  }
}

const TicketService = new Service();
export default TicketService;
