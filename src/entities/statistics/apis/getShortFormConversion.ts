import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse } from "@shared/types";

export interface ShortFormConversion {
  thisMonthRate: number;
  rateDiff: number;
}

export const getShortFormConversion = async () => {
  const res = await api.get<ApiResponse<ShortFormConversion>>(
    END_POINTS.SHORT_FORM_CONVERSION,
  );
  return res.data.data;
};
