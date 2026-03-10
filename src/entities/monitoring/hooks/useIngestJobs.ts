import { useEffect, useState } from "react";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { IngestJob, getIngestJobs } from "@entities/monitoring/apis";
import { useInfiniteScroll } from "@shared/hooks";

const POLL_INTERVAL = 20000; // polling 간격 초

interface UseInfiniteIngestJobsParams {
  size?: number;
  searchWord?: string;
}

export const useIngestJobs = ({
  size = 10,
  searchWord,
}: UseInfiniteIngestJobsParams) => {
  const queryClient = useQueryClient();
  const [countdown, setCountdown] = useState(POLL_INTERVAL / 1000); // 카운트다운 타이머

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
    refetchInterval: POLL_INTERVAL,
  });

  // ==================================================
  // 카운트다운 타이머 기능 부분
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // polling 시 타이머 숫자 리셋
  useEffect(() => {
    setTimeout(() => {
      setCountdown(POLL_INTERVAL / 1000);
    }, 0);
  }, [dataUpdatedAt]);
  // ==================================================

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

  return { ...query, ingestJobList, observerRef, dataUpdatedAt, countdown };
};
