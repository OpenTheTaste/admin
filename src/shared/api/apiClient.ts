import axios from "axios";
import { ApiError } from "@shared/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const apiError = error.response?.data as ApiError | undefined;

    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        if (!window.location.pathname.includes("/auth/login")) {
          window.location.href = "/auth/login";
        }
      }
    }
    if (apiError) {
      return Promise.reject(apiError);
    }
    return Promise.reject({
      success: false,
      message: error.message,
    });
  },
);
