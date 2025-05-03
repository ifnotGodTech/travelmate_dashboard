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
  getTickets(url?: string) {
    const endpoint = url || env.api.ticket;
    return axios.get(endpoint);
  }

  getTicketsStats = ({ days }: { days?: number }) => {
    const endpoint = `${env.api.ticket}all_stats/`;
    const params = days ? `?days=${days}` : "";
    return axios.get(`${endpoint}${params}`);
  };

  getTicket({ TicketId }: { TicketId?: string }) {
    return axios.get(env.api.ticket + TicketId + "/");
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
}

const TicketService = new Service();
export default TicketService;
