import axios from "axios";
import env from "@/config/env";

class Service {
  getServices() {
    return axios.get(env.api.cms);
  }
  updateService({ id, payload }: { id: string; payload: any }) {
    return axios.patch(env.api.cms + id + "/", payload);
  }
}

const CMSService = new Service();
export default CMSService;
