import { api } from "@shared/api";

export const logoutApi = async () => {
  await api.post("/logout");
};
