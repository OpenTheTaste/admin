import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse, Role } from "@shared/types";

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  memberId: number;
  role: Role;
  email: string;
  nickname: string;
}

export const loginApi = async (body: AdminLoginRequest) => {
  const { data } = await api.post<ApiResponse<AdminLoginResponse>>(
    END_POINTS.LOGIN,
    body,
  );
  return data.data;
};
