import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export interface ChangeRoleParams {
  role: "EDITOR" | "SUSPENDED";
}

export const changeRoleApi = async (
  memberId: number,
  params: ChangeRoleParams,
) => {
  await api.patch(END_POINTS.MEMBERS_CHANGE_ROLE(memberId), params);
};
