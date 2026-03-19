import { useInfiniteQuery } from "@tanstack/react-query";
import {
  SeriesTitleItem,
  getSeriesTitleApi,
} from "@entities/video-contents/apis";
import { useInfiniteScroll } from "@shared/hooks";

interface UseInfiniteSeriesTitleParams {
  size?: number;
  searchWord?: string;
}
export const useInfiniteSeriesTitle = ({
  size = 10,
  searchWord,
}: UseInfiniteSeriesTitleParams) => {
  const query = useInfiniteQuery({
    queryKey: ["series", "title", { size, searchWord }],
    queryFn: ({ pageParam = 0 }) =>
      getSeriesTitleApi({
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

  const seriesTitles: SeriesTitleItem[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, seriesTitles, observerRef };
};
