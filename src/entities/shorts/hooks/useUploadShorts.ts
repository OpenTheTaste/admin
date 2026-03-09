import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadShortsRequest, uploadShortsApi } from "@entities/shorts/apis";

// 숏폼 업로드
export const useUploadShorts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UploadShortsRequest) => uploadShortsApi(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shorts", "list"] });
    },
  });
};
