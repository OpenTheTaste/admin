import { api } from "@shared/api";
import { ApiResponse } from "@shared/types";

export interface ShortFormConversion {
  thisMonthRate: number;
  rateDiff: number;
}

export const getShortFormConversion = async () => {
  const res = await api.get<ApiResponse<ShortFormConversion>>(
    "/admin/short-form-conversion",
  );
  return res.data.data;
};
