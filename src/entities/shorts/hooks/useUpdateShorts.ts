import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateShortsRequest, updateShortsApi } from "@entities/shorts/apis";

// 숏폼 수정
export const useUpdateShorts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      shortformId,
      body,
    }: {
      shortformId: number;
      body: UpdateShortsRequest;
    }) => updateShortsApi(shortformId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shorts", "list"] });
    },
  });
};
