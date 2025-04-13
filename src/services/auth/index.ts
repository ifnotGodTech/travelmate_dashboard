import axios from "axios";
import env from "@/config/env";
import {
  AuthInterface,
  TLoginService,
  TNewPassword,
  TResetPassword,
  TVerifyOTP,
} from "./types";

class Service implements AuthInterface {
  login({ payload }: TLoginService) {
    return axios.post(env.api.auth + "jwt/validate-password/", payload);
  }
  resetPassword({ payload }: TResetPassword) {
    return axios.post(env.api.user + "/reset_password/", payload);
  }
  verifyToken({ payload }: TVerifyOTP) {
    return axios.post(env.api.user + "/validate_reset_token/", payload);
  }
  newPassword({ payload }: TNewPassword) {
    return axios.post(env.api.user + "/set_new_password/", payload);
  }
}

const AuthService = new Service();
export default AuthService;
