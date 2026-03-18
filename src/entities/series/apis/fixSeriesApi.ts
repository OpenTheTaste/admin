import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse, PublicStatus } from "@shared/types";

export interface FixSeriesRequest {
  seriesId: number;
  title: string;
  description: string;
  actors: string;
  publicStatus: PublicStatus;
  categoryId: number;
  tagIdList: number[];
  posterFileName?: string;
  thumbnailFileName?: string;
}

export interface FixSeriesResponse {
  seriesId: number;
  posterObjectKey?: string;
  thumbnailObjectKey?: string;
  posterUploadUrl?: string;
  thumbnailUploadUrl?: string;
}

export const fixSeriesApi = async ({ seriesId, ...body }: FixSeriesRequest) => {
  console.log("[fixSeriesApi] seriesId:", seriesId, "body:", body);
  const res = await api.patch<ApiResponse<FixSeriesResponse>>(
    END_POINTS.SERIES_FIX(seriesId),
    body,
  );
  return res.data.data;
};
