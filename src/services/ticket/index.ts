import axios from "axios";
import env from "@/config/env";
import instance from "@/hooks/initializers/useAxiosDefaults";

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
    return instance.get(fullUrl);
  }

  getTicketsStats = ({ days }: { days?: number }) => {
    const endpoint = `${env.api.ticket}all_stats/`;
    const params = days ? `?days=${days}` : "";
    return instance.get(`${endpoint}${params}`);
  };

  getTicket({ TicketId }: { TicketId?: string }) {
    return instance.get(env.api.ticket + TicketId + "/");
  }

  claimTicket({ TicketId }: { TicketId?: string }) {
    return instance.post(env.api.ticket + TicketId + "/claim/");
  }

  getEscalationLevel() {
    return instance.get(env.api.superadmin + "/roles/admin-list/");
  }
  createEscalationLevel({ payload }: { payload: TEscalationPayload }) {
    return instance.post(env.api.escalation + "/", payload);
  }

  getEscalationReasons() {
    return instance.get(env.api.admin + "/escalation-reasons/");
  }

  escalateTicket({
    TicketId,
    payload,
  }: {
    TicketId: string;
    payload: TEscalateTicket;
  }) {
    return instance.post(env.api.ticket + TicketId + "/escalate/", payload);
  }

  respondToTicket({
    TicketId,
    payload,
  }: {
    TicketId: string;
    payload: any;
  }) {
    return instance.post(env.api.ticket + TicketId + "/messages/", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  resolveTicket(TicketId: string) {
    return instance.post(`${env.api.ticket}${TicketId}/resolve/`);
  }
}

const TicketService = new Service();
export default TicketService;
