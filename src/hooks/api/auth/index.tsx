import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";
import { useUpdateAuthContext } from "@/context/AuthContext";

import env from "@/config/env";
import { AxiosError } from "axios";
import { AuthInterface } from "@/services/auth/types";

const INITIAL_APP_STATE = env.auth.INITIAL_APP_STATE;

export const useLoginUser = ({ Service }: { Service: AuthInterface }) => {
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const updateAppState = useUpdateAuthContext();

  const onLogin = async ({
    payload,
    successCallback,
  }: {
    payload: { email: string; password: string };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await Service.login({ payload });
      updateAppState({
        accessToken: res.data.access,
        refreshToken: res.data.refresh,
        user: { id: res.data.setup_info.email },
      });
      showSuccessToast({
        message: res.data.message || "🚀 Login success!",
        description: res.data.description || "",
      });

      successCallback?.();
      setRedirecting(true);
    } catch (error: Error | AxiosError | any) {
      if (error.response?.status === 400) {
        showErrorToast({
          message: error.response?.data?.detail || "Invalid credentials!",
        });
      } else {
        console.error("Login Error:", error);
        showErrorToast({
          message: error?.response?.data?.message || "An error occurred!",
          description: error?.response?.data?.description || "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, onLogin, redirecting };
};

export function useForgotPassword({ Service }: { Service: AuthInterface }) {
  const [loading, setLoading] = useState(false);

  const onForgotPassword = async ({
    payload,
    successCallback,
    errorCallback,
  }: {
    payload: { email: string };
    successCallback?: (message: string) => void;
    errorCallback?: (props: { message?: string; description?: string }) => void;
  }) => {
    setLoading(true);
    try {
      const res = await Service.resetPassword({ payload });
      showSuccessToast({
        message: res?.data?.message || "Email sent successfully.",
        description: res.data.description || "",
      });
      successCallback?.(res?.data?.message || "Email sent successfully.");
    } catch (error: any) {
      errorCallback?.({
        message: error?.response?.data?.message || "An error occurred!",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, onForgotPassword };
}

// export const useRendOTP =

export function useLogout() {
  const updateAppState = useUpdateAuthContext();

  const onLogout = () => {
    updateAppState(INITIAL_APP_STATE);
  };

  return { onLogout };
}

export function useNewPassword({ Service }: { Service: AuthInterface }) {
  const [loading, setLoading] = useState(false);

  const onNewPassword = async ({
    payload,
    successCallback,
    errorCallback,
  }: {
    payload: {
      email: string;
      otp: string;
      new_password: string;
      re_new_password: string;
    };
    successCallback?: (message: string) => void;
    errorCallback?: (error: { message: string; description?: string }) => void;
  }) => {
    setLoading(true);
    try {
      console.log(payload);
      const response = await Service.newPassword({ payload });
      showSuccessToast({
        message: response.data.message || "🚀 Password Reset successful!",
        description: response.data.description || "",
      });
      successCallback?.(response.data.message);
    } catch (error: any) {
      errorCallback?.({
        message: error?.response?.data?.message || "An error occurred!",
        description: error?.response?.data?.description || "",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, onNewPassword };
}
