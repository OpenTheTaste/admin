// 태그별 시청 통계 조회
import { api } from "@shared/api";
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
    `/admin/tags/stats/${categoryId}`,
  );
  return res.data.data;
};
