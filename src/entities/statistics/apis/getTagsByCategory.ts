// 카테고리별 태그 목록 조회
import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse } from "@shared/types";

export interface Tag {
  tagId: number;
  name: string;
}

export const getTagsByCategory = async (categoryId: number) => {
  const res = await api.get<ApiResponse<Tag[]>>(
    END_POINTS.TAGS_BY_CATEGORY(categoryId),
  );
  return res.data.data;
};
