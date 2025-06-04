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

  deactivateUser({ userId, data }: { userId?: string; data: any }) {
    return axios.patch(env.api.users + userId + "/deactivate/", data);
  }

  reactivateUser({ userId, data }: { userId?: string; data: any }) {
    return axios.patch(env.api.users + userId + "/activate/", data);
  }

  deleteUser({ userId }: { userId?: string }) {
    return axios.delete(env.api.users + userId + "/");
  }

  bulkDeleteUser({ userIds }: { userIds: number[] }) {
    return axios.delete(env.api.users + "bulk-delete/", {
      data: { user_ids: userIds },
    });
  }

  exportCSV() {
    return axios.get(env.api.users + "export/");
  }
}

const UserService = new Service();
export default UserService;
