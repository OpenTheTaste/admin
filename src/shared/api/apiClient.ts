import axios, { InternalAxiosRequestConfig } from "axios";
import { ApiError } from "@shared/types";
import { reissueApi } from "./reissueApi";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: () => void;
  reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const apiError = error.response?.data as ApiError | undefined;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        console.log("[Token 재발급] 이미 갱신 중 → 대기열 추가");
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      console.log("[Token 재발급] 갱신 시작");

      try {
        await reissueApi.refresh();
        console.log("[Token 재발급] 성공 → 원래 요청 재시도");
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        console.error("[Token 재발급] 실패 → 현재 페이지 유지", refreshError);
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
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
