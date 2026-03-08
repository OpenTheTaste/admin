// 태그별 시청 통계 조회
import { api } from "@shared/api";
import { ApiResponse, TagStat } from "@shared/types";

export const getTagStatsByCategory = async (categoryId: number) => {
  const res = await api.get<ApiResponse<TagStat[]>>(
    `/admin/tags/stats/${categoryId}`,
  );
  return res.data.data;
};
