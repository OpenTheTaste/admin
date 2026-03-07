import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const reissueClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const reissueApi = {
  refresh: async (): Promise<void> => {
    await reissueClient.post("/reissue", null);
  },
};
