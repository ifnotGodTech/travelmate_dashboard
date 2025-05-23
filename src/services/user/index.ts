import axios from "axios";
import env from "@/config/env";

type TDeactivatePayload = {
  email: string;
  reason?: string;
  additional_note?: string;
};

class Service {
  getAllUser = (url?: string) => {
    const endpoint = url || env.api.users;
    return axios.get(endpoint);
  };

  getUser({ UserId }: { UserId?: string }) {
    return axios.get(env.api.users + UserId + "/");
  }

  deactivateUser({
    userId,
    payload,
  }: {
    userId?: string;
    payload: TDeactivatePayload;
  }) {
    return axios.patch(env.api.users + userId + "/deactivate/", payload);
  }

  exportCSV() {
    return axios.get(env.api.users + "export/");
  }
}

const UserService = new Service();
export default UserService;
