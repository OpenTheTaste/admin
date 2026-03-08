import { useQuery } from "@tanstack/react-query";
import { getIngestJobs } from "@entities/monitoring/apis";
import { BasePaginationParams } from "@shared/types";

export const useIngestJobs = ({
  page,
  size,
  searchWord,
}: BasePaginationParams) => {
  return useQuery({
    queryKey: ["ingestJobs", page, size, searchWord],
    queryFn: () => getIngestJobs({ page, size, searchWord }),
    refetchInterval: 20000, // polling 20초
  });
};
