import { useQuery } from "@tanstack/react-query";
import { getShortFormConversion } from "@entities/statistics/apis";

export const useShortFormConversion = () => {
  return useQuery({
    queryKey: ["shortFormConversion"],
    queryFn: getShortFormConversion,
  });
};
