// 카테고리별 태그 목록 조회
import { api } from "@shared/api";
import { ApiResponse } from "@shared/types";

export interface Tag {
  tagId: number;
  name: string;
}

export const getTagsByCategory = async (categoryId: number) => {
  const res = await api.get<ApiResponse<Tag[]>>(`/admin/tags/${categoryId}`);
  return res.data.data;
};
