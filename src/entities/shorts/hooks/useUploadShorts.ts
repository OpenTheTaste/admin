import { useMutation } from "@tanstack/react-query";
import { UploadShortsRequest, uploadShortsApi } from "@entities/shorts/apis";

// 숏폼 업로드
export const useUploadShorts = () => {
  return useMutation({
    mutationFn: (body: UploadShortsRequest) => uploadShortsApi(body),
  });
};
