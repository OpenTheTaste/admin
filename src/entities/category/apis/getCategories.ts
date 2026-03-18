import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse } from "@shared/types";

export interface CategoryResponse {
  categoryId: number;
  categoryName: string;
}

export const getCategoriespi = async () => {
  const res = await api.get<ApiResponse<CategoryResponse[]>>(
    END_POINTS.CATEGORIES,
  );
  return res.data.data;
};
