// 카테고리별 태그 목록 조회
import { api } from "@shared/api";
import { ApiResponse, Tag } from "@shared/types";

export const getTagsByCategory = async (categoryId: number) => {
  const res = await api.get<ApiResponse<Tag[]>>(`/admin/tags/${categoryId}`);
  return res.data.data;
};
