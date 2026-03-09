// 카테고리별 태그 목록 조회
import { useQuery } from "@tanstack/react-query";
import { getTagsByCategory } from "@entities/statistics/apis";

export const useTagsByCategory = (categoryId: number | null) => {
  return useQuery({
    queryKey: ["tagsByCategory", categoryId],
    queryFn: () => getTagsByCategory(categoryId!),
    enabled: categoryId !== null,
  });
};
