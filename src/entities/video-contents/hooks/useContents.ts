import { PublicStatus } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  ContentListItem,
  getContentDetailApi,
  getContentListApi,
} from "@entities/video-contents/apis";
import { useInfiniteScroll } from "@shared/hooks";

interface UseInfiniteContentListParams {
  size?: number;
  searchWord?: string;
  publicStatus?: PublicStatus;
}

export const useInfiniteContentList = ({
  size = 10,
  searchWord,
  publicStatus,
}: UseInfiniteContentListParams) => {
  const query = useInfiniteQuery({
    queryKey: ["contents", "list", { searchWord, publicStatus }],
    queryFn: ({ pageParam = 0 }) =>
      getContentListApi({
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

  const contentList: ContentListItem[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, contentList, observerRef };
};

export const useContentDetail = (mediaId: number) => {
  return useQuery({
    queryKey: ["contents", "detail", mediaId],
    queryFn: () => getContentDetailApi(mediaId),
    enabled: !!mediaId,
  });
};
