import axios from "axios";
import env from "@/config/env";
import { AuthInterface, TLoginService, TNewPassword, TResetPassword } from "./types";

class Service implements AuthInterface {
  login({ payload }: TLoginService) {
    return axios.post(env.api.auth + "jwt/validate-password/", payload);
  }

  resetPassword({ payload }: TResetPassword) {
    return axios.post(env.api.user + "/reset_password/", payload);
  }
  newPassword({ payload }: TNewPassword) {
    return axios.post(env.api.user + "/reset_password_confirm/", payload);
  }
}

const AuthService = new Service();
export default AuthService;