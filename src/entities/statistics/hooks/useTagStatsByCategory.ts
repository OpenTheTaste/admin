// 태그별 시청 통계 조회
import { useQuery } from "@tanstack/react-query";
import { getTagStatsByCategory } from "@entities/statistics/apis";

export const useTagStatsByCategory = (categoryId: number) => {
  return useQuery({
    queryKey: ["tagStatsByCategory", categoryId],
    queryFn: () => getTagStatsByCategory(categoryId),
  });
};
