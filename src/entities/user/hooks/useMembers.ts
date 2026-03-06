import { useInfiniteQuery } from "@tanstack/react-query";
import { MemberListItem, getMemberListApi } from "@entities/user/apis";
import { useInfiniteScroll } from "@shared/hooks";

interface UseInfiniteMemberListParams {
  size?: number;
  searchWord?: string;
  role?: string;
}

export const useInfiniteMemberList = ({
  size = 10,
  searchWord,
  role,
}: UseInfiniteMemberListParams) => {
  const query = useInfiniteQuery({
    queryKey: ["members", "list", { size, searchWord, role }],
    queryFn: ({ pageParam = 0 }) =>
      getMemberListApi({
        page: pageParam as number,
        size,
        searchWord: searchWord || undefined,
        role,
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

  const memberList: MemberListItem[] =
    query.data?.pages.flatMap((page) => page.dataList) ?? [];

  return { ...query, memberList, observerRef };
};
