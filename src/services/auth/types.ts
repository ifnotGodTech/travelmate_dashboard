import { AxiosResponse } from "axios";

export type TLoginService = {
  payload: {
    email?: string;
    password?: string;
  };
};

export type TResetPassword = {
  payload: {
    email?: string;
  };
};
export type TVerifyOTP = {
  payload: {
    email?: string;
    token?: string;
  };
};
export type TNewPassword = {
  payload?: {
    email?: string;
    token?: string;
    new_password?: string;
    re_new_password?: string;
  };
};

export interface AuthInterface {
  login: ({ payload }: TLoginService) => Promise<AxiosResponse<any, any>>;
  resetPassword: ({
    payload,
  }: TResetPassword) => Promise<AxiosResponse<any, any>>;
  newPassword: ({ payload }: TNewPassword) => Promise<AxiosResponse<any, any>>;
  verifyToken: ({ payload }: TVerifyOTP) => Promise<AxiosResponse<any, any>>;
}
