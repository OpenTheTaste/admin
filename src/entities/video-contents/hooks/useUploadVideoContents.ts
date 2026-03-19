import { useMutation } from "@tanstack/react-query";
import {
  UploadVideoRequest,
  patchupdateVideoApi,
  uploadVideoApi,
} from "@entities/video-contents/apis";

export const useUploadVideoContents = () => {
  return useMutation({
    mutationFn: (body: UploadVideoRequest) => uploadVideoApi(body),
  });
};

export const useUpdateVideoContents = () => {
  return useMutation({
    mutationFn: ({
      contentsId,
      body,
    }: {
      contentsId: number;
      body: UploadVideoRequest;
    }) => patchupdateVideoApi(contentsId, body),
  });
};
