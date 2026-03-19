import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse, PublicStatus } from "@shared/types";

export interface UploadSeriesRequest {
  title: string;
  description: string;
  actors: string;
  publicStatus: PublicStatus;
  categoryId: number;
  tagIdList: number[];
  posterFileName: string;
  thumbnailFileName: string;
}

export interface UploadSeriesResponse {
  seriesId: number;
  posterObjectKey: string;
  thumbnailObjectKey: string;
  posterUploadUrl: string;
  thumbnailUploadUrl: string;
}

export const postuploadSeriesApi = async (body: UploadSeriesRequest) => {
  const res = await api.post<ApiResponse<UploadSeriesResponse>>(
    END_POINTS.SERIES_UPLOAD,
    body,
  );
  return res.data.data;
};
