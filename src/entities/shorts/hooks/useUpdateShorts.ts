import { useMutation } from "@tanstack/react-query";
import {
  UpdateShortsRequest,
  patchupdateShortsApi,
} from "@entities/shorts/apis";

// 숏폼 수정
export const useUpdateShorts = () => {
  return useMutation({
    mutationFn: ({
      shortformId,
      body,
    }: {
      shortformId: number;
      body: UpdateShortsRequest;
    }) => patchupdateShortsApi(shortformId, body),
  });
};
