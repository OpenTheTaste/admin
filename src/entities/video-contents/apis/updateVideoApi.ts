import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse } from "@shared/types";
import { UploadVideoRequest, UploadVideoResponse } from "./videoContentsApi";

// 콘텐츠 수정 API
export const updateVideoApi = async (
  contentsId: number,
  body: UploadVideoRequest,
) => {
  const res = await api.patch<ApiResponse<UploadVideoResponse>>(
    END_POINTS.CONTENTS_UPDATE(contentsId),
    body,
  );
  return res.data.data;
};
