import { api } from "@shared/api";

export const logoutApi = () => {
  api.post("/back-office/logout");
};
