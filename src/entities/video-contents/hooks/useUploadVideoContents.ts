import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UploadVideoRequest,
  updateVideoApi,
  uploadVideoApi,
} from "@entities/video-contents/apis";

export const useUploadVideoContents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UploadVideoRequest) => uploadVideoApi(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents", "list"] });
    },
  });
};

export const useUpdateVideoContents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      contentsId,
      body,
    }: {
      contentsId: number;
      body: UploadVideoRequest;
    }) => updateVideoApi(contentsId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents", "list"] });
    },
  });
};
