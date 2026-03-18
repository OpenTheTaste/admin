// 태그별 시청 통계 조회
import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse } from "@shared/types";

export interface CategoryStatistic {
  labels: string[];
  data: number[];
}

export interface TagStat {
  tagName: string;
  viewCount: number;
}

export const getTagStatsByCategory = async (categoryId: number) => {
  const res = await api.get<ApiResponse<TagStat[]>>(
    END_POINTS.TAG_STATS_BY_CATEGORY(categoryId),
  );
  return res.data.data;
};
