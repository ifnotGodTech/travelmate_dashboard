import axios from "axios";
import env from "@/config/env";
import instance from "@/hooks/initializers/useAxiosDefaults";

class Service {
  getRoles() {
    return instance.get(env.api.superadmin + "roles/admin-list/");
  }
  getMyRole() {
    return instance.get(env.api.roles + "roles/");
  }
}

const RolesService = new Service();
export default RolesService;
