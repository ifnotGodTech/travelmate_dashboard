import axios from "axios";
import env from "@/config/env";

class Service {
  getRoles() {
    return axios.get(env.api.superadmin + "roles/");
  }
}

const RolesService = new Service();
export default RolesService;
