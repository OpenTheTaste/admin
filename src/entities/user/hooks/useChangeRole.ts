import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ChangeRoleParams,
  MemberListResponse,
  patchchangeRoleApi,
} from "@entities/user/apis";

export const useChangeRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberId,
      params,
    }: {
      memberId: number;
      params: ChangeRoleParams;
    }) => patchchangeRoleApi(memberId, params),
    onSuccess: (_, { memberId, params }) => {
      const queries = queryClient.getQueriesData<{
        pages: MemberListResponse[];
      }>({ queryKey: ["members"] });

      queries.forEach(([queryKey]) => {
        const filters = queryKey[2] as { role?: string };

        // 역할 필터가 걸려있으면 invalidate
        if (filters?.role) {
          queryClient.invalidateQueries({ queryKey });
        } else {
          // 필터 없으면 캐시 직접 수정
          queryClient.setQueryData<{ pages: MemberListResponse[] }>(
            queryKey,
            (old) => {
              if (!old) return old;
              return {
                ...old,
                pages: old.pages.map((page) => ({
                  ...page,
                  dataList: page.dataList.map((m) =>
                    m.memberId === memberId ? { ...m, role: params.role } : m,
                  ),
                })),
              };
            },
          );
        }
      });
    },
  });
};
