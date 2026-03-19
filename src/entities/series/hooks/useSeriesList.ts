import { useInfiniteQuery } from "@tanstack/react-query";
import { SeriesListItem, getSeriesListApi } from "@entities/series/apis";
import { useInfiniteScroll } from "@shared/hooks";

interface UseInfiniteSeriesListParams {
  size?: number;
  searchWord?: string;
}

export const useInfiniteSeriesList = ({
  size = 10,
  searchWord,
}: UseInfiniteSeriesListParams) => {
  const query = useInfiniteQuery({
    queryKey: ["series", "list", { size, searchWord }],
    queryFn: ({ pageParam = 0 }) =>
      getSeriesListApi({
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

  const seriesList: SeriesListItem[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, seriesList, observerRef };
};
