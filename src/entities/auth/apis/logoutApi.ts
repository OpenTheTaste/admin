import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export const logoutApi = async () => {
  await api.post(END_POINTS.LOGOUT);
};
