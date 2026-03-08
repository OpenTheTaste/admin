import { api } from "@shared/api";
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

export const uploadSeriesApi = async (body: UploadSeriesRequest) => {
  const res = await api.post<ApiResponse<UploadSeriesResponse>>(
    "admin/series/upload",
    body,
  );
  return res.data.data;
};
