import { api } from "@shared/api";
import { ApiResponse } from "@shared/types";

export interface CategoryResponse {
  categoryId: number;
  categoryName: string;
}

export const getCategoriespi = async () => {
  const res = await api.get<ApiResponse<CategoryResponse[]>>("/categories");
  return res.data.data;
};
