import { api } from "@shared/api";
import { ApiResponse } from "@shared/types";

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  memberId: number;
  role: "ADMIN" | "EDITOR";
}

export const loginApi = async (body: AdminLoginRequest) => {
  const res = await api.post<ApiResponse<AdminLoginResponse>>(
    "/login",
    body,
  );
  return res.data.data;
};
