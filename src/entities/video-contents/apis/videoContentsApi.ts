import { api } from "@shared/api";
import { ApiResponse, PublicStatus } from "@shared/types";

export interface UploadVideoRequest {
  seriesId?: number;
  title: string;
  description: string;
  actors: string;
  publicStatus: PublicStatus;
  categoryId: number;
  tagIdList?: number[];
  duration?: number;
  videoSize?: number;
  posterFileName?: string;
  thumbnailFileName?: string;
  originFileName?: string;
}

export interface UploadVideoResponse {
  contentsId: number;
  posterObjectKey: string;
  thumbnailObjectKey: string;
  originObjectKey: string;
  masterPlaylistObjectKey: string;
  posterUploadUrl: string; // S3에 업로드할 때 사용할 URL - 포스터 이미지 파일
  thumbnailUploadUrl: string; // S3에 업로드할 때 사용할 URL - 썸네일 이미지 파일
  originUploadUrl: string; // S3에 업로드할 때 사용할 URL - 원본 영상 파일 (n개 예정)
}

// 콘텐츠 업로드 API
export const uploadVideoApi = async (body: UploadVideoRequest) => {
  const res = await api.post<ApiResponse<UploadVideoResponse>>(
    "/admin/contents/upload",
    body,
  );
  return res.data.data;
};

export interface UpadteVideoRequest {
  seriesId?: number;
  title: string;
  description: string;
  actors: string;
  publicStatus: PublicStatus;
  categoryId: number;
  tagIdList?: number[];
  posterFileName?: string;
  thumbnailFileName?: string;
}

export interface UpadteVideoResponse {
  contentsId: number;
  posterObjectKey: string;
  thumbnailObjectKey: string;
  originObjectKey: string;
  masterPlaylistObjectKey: string;
  posterUploadUrl: string; // S3에 업로드할 때 사용할 URL - 포스터 이미지 파일
  thumbnailUploadUrl: string; // S3에 업로드할 때 사용할 URL - 썸네일 이미지 파일
  originUploadUrl: string; // S3에 업로드할 때 사용할 URL - 원본 영상 파일 (n개 예정)
}

// 콘텐츠 수정 API
export const updateVideoApi = async (
  contentsId: number,
  body: UploadVideoRequest,
) => {
  const res = await api.patch<ApiResponse<UploadVideoResponse>>(
    `/admin/contents/${contentsId}/upload`,
    body,
  );
  return res.data.data;
};
