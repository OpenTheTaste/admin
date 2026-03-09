import { useInfiniteQuery } from "@tanstack/react-query";
import { OriginMediaItem, getOriginMediaApi } from "@entities/originMedia/apis";
import { useInfiniteScroll } from "@shared/hooks";

interface UseInfiniteOriginMediaParams {
  size?: number;
  searchWord?: string;
}

export const useInfiniteOriginMedia = ({
  size = 10,
  searchWord,
}: UseInfiniteOriginMediaParams = {}) => {
  const query = useInfiniteQuery({
    queryKey: ["origin-media", "list", { size, searchWord }],
    queryFn: ({ pageParam = 0 }) =>
      getOriginMediaApi({
        page: pageParam as number,
        size,
        searchWord,
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

  const originMediaList: OriginMediaItem[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, originMediaList, observerRef };
};
