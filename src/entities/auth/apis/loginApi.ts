import { api } from "@shared/api";

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  memberId: number;
  role: "ADMIN" | "EDITOR";
}

export const loginApi = (body: AdminLoginRequest) =>
  api.post<AdminLoginResponse>("/back-office/login", body);
