import { useInfiniteScroll } from "@/shared/hooks";
import { PublicStatus } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  ShortsListItem,
  getShortsDetailApi,
  getShortsListApi,
} from "@entities/shorts/apis";

interface UseInfiniteShortsListParams {
  size?: number;
  searchWord?: string;
  publicStatus?: PublicStatus;
}

export const useInfiniteShortsList = ({
  size = 10,
  searchWord,
  publicStatus,
}: UseInfiniteShortsListParams) => {
  const query = useInfiniteQuery({
    queryKey: ["shorts", "list", { size, searchWord, publicStatus }],
    queryFn: ({ pageParam = 0 }) =>
      getShortsListApi({
        page: pageParam as number,
        size,
        searchWord: searchWord || undefined,
        publicStatus,
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

  const shortsList: ShortsListItem[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, shortsList, observerRef };
};

export const useShortsDetail = (mediaId: number) => {
  return useQuery({
    queryKey: ["shorts", "detail", mediaId],
    queryFn: () => getShortsDetailApi(mediaId),
    enabled: !!mediaId,
  });
};
