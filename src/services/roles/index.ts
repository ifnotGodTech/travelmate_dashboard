import axios from "axios";
import env from "@/config/env";

class Service {
  getRoles() {
    return axios.get(env.api.superadmin + "roles/admin-list/");
  }
  getMyRole() {
    return axios.get(env.api.roles + "roles/");
  }
}

const RolesService = new Service();
export default RolesService;
