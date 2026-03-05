import { useQuery } from "@tanstack/react-query";
import { getCategoriespi } from "@entities/category/apis";

// 카테고리 조회
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriespi(),
  });
};
