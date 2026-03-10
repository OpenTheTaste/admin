import { useInfiniteQuery } from "@tanstack/react-query";
import { IngestJob, getIngestJobs } from "@entities/monitoring/apis";
import { useInfiniteScroll } from "@shared/hooks";

interface UseInfiniteIngestJobsParams {
  size?: number;
  searchWord?: string;
}

export const useIngestJobs = ({
  size = 10,
  searchWord,
}: UseInfiniteIngestJobsParams) => {
  const query = useInfiniteQuery({
    queryKey: ["ingestJobs", { size, searchWord }],
    queryFn: ({ pageParam = 0 }) =>
      getIngestJobs({
        page: pageParam as number,
        size,
        searchWord: searchWord || undefined,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPage } = lastPage.pageInfo;
      return currentPage + 1 < totalPage ? currentPage + 1 : undefined;
    },
    refetchInterval: 20000,
  });

  const { observerRef } = useInfiniteScroll({
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  });

  const ingestJobList: IngestJob[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, ingestJobList, observerRef };
};
