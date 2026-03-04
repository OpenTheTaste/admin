import { api } from "@shared/api";

export interface ChangeRoleParams {
  role: "EDITOR" | "SUSPENDED";
}

export const changeRoleApi = async (memberId: number, params: ChangeRoleParams) => {
  await api.patch(`/admin/members/${memberId}/role`, params);
};
