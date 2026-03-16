import { api } from "@shared/api";
import { ApiResponse, Role } from "@shared/types";

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  memberId: number;
  role: Role;
}

export const loginApi = async (body: AdminLoginRequest) => {
  const { data } = await api.post<ApiResponse<AdminLoginResponse>>(
    "/login",
    body,
  );
  return data.data;
};
