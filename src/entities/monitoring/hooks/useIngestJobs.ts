import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  // page 0만 20초마다 polling 해주는 useQuery
  // dataUpdatedAt = 쿼리 데이터가 마지막으로 갱신된 시각 (이거로 구분)
  const { dataUpdatedAt } = useQuery({
    queryKey: [
      "ingestJobs",
      "latest",
      { size, searchWord: searchWord || undefined },
    ],
    queryFn: async () => {
      // 최신 page 0을 가져옴 -> latest
      const latest = await getIngestJobs({
        page: 0,
        size,
        searchWord: searchWord || undefined,
      });

      // useInfiniteQuery 캐시의 첫 페이지만 교체
      queryClient.setQueryData(
        ["ingestJobs", { size, searchWord: searchWord || undefined }],
        (
          oldData:
            | { pages: (typeof latest)[]; pageParams: unknown[] }
            | undefined,
        ) => {
          if (!oldData) {
            return oldData;
          }
          const newData = [latest, ...oldData.pages.slice(1)];
          return {
            ...oldData,
            pages: newData,
          };
        },
      );
      return latest;
    },
    refetchInterval: 10000,
  });

  // 무한스크롤 useInfiniteQuery
  const query = useInfiniteQuery({
    queryKey: ["ingestJobs", { size, searchWord: searchWord || undefined }],
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
  });

  const { observerRef } = useInfiniteScroll({
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  });

  const ingestJobList: IngestJob[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, ingestJobList, observerRef, dataUpdatedAt };
};
