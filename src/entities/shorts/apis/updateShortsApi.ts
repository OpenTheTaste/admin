import { UploadShortsResponse } from "@entities/shorts/apis";
import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse, PublicStatus } from "@shared/types";

export interface UpdateShortsRequest {
  originId: number;
  mediaType: "CONTENTS" | "SERIES";
  title?: string;
  description?: string;
  publicStatus: PublicStatus;
  posterFileName?: string;
}

export const updateShortsApi = async (
  shortformId: number,
  body: UpdateShortsRequest,
) => {
  const res = await api.patch<ApiResponse<UploadShortsResponse>>(
    END_POINTS.SHORT_FORMS_UPDATE(shortformId),
    body,
  );
  return res.data.data;
};
