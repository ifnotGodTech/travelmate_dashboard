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
  getAllUser = (url?: string) => {
    const endpoint = url || env.api.users;
    return axios.get(endpoint);
  };

  getUser({ UserId }: { UserId?: string }) {
    return axios.get(env.api.users + UserId + "/");
  }

  deactivateUser({ userId, email }: { userId?: string; email?: string }) {
    return axios.patch(env.api.users + userId + "/deactivate/", email);
  }

  exportCSV() {
    return axios.get(env.api.users + "export/");
  }
}

const UserService = new Service();
export default UserService;
