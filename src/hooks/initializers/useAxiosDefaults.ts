"use client";
import * as React from "react";
import axios, { AxiosError } from "axios";
import env from "@/config/env";
import { useUpdateAuthContext } from "@/context/AuthContext";

function isUnAuthorizedError(error: Error | AxiosError | any) {
  return error?.config && error?.response && error?.response?.status === 403;
}

let tokenRefreshRetries = 0;

function useAxiosDefaults({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken?: string;
}) {
  const updateAppState = useUpdateAuthContext();

  // Set default content type
  axios.defaults.headers.post["Content-Type"] = "application/json";

  // Conditionally attach Authorization header
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;

      const isLogin = originalRequest?.url?.includes("/login");
      const isRefresh = originalRequest?.url?.includes("/refresh");

      if (isUnAuthorizedError(error) && !isLogin && !isRefresh) {
        if (tokenRefreshRetries < 3 && refreshToken) {
          tokenRefreshRetries++;

          try {
            const response = await axios.post(
              `${env.api.auth}/jwt/token/refresh/`,
              { refreshToken },
              { headers: { Authorization: "" } }
            );

            const newAccessToken = response?.data?.access;

            // Update context state
            updateAppState({
              accessToken: newAccessToken,
            });

            // Update global header and original request
            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return axios(originalRequest); // Retry the original request
          } catch (refreshError: any) {
            console.error(
              "Token refresh failed:",
              refreshError.response?.data || refreshError.message
            );
            window.location.href = `/auth/login`;
            return Promise.reject(refreshError);
          }
        } else {
          console.warn("Max retries exceeded or no refresh token available.");
          window.location.href = `/auth/login`;
        }
      }

      return Promise.reject(error);
    }
  );

  React.useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [accessToken]);
}

export default useAxiosDefaults;
