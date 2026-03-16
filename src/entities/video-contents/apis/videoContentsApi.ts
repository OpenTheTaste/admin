import { api } from "@shared/api";
import { UploadedPart } from "@shared/lib";
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
  posterUploadUrl: string;
  thumbnailUploadUrl: string;
  originUploadId: string;
  originTotalPartCount: number;
  originPartSizeBytes: number;
}

// 콘텐츠 업로드 API
export const uploadVideoApi = async (body: UploadVideoRequest) => {
  const res = await api.post<ApiResponse<UploadVideoResponse>>(
    "/admin/contents/upload",
    body,
  );
  return res.data.data;
};

// 멀티파트 완료 post
export interface CompleteMultipartRequest {
  objectKey: string;
  uploadId: string;
  parts: UploadedPart[];
}

export const completeMultipartUploadApi = async (
  contentsId: number,
  body: CompleteMultipartRequest,
) => {
  const res = await api.post<ApiResponse<void>>(
    `/admin/contents/${contentsId}/upload/complete`,
    body,
  );
  return res.data;
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
  posterUploadUrl: string; // S3에 업로드할 때 사용할 URL - 포스터 이미지 파일
  thumbnailUploadUrl: string; // S3에 업로드할 때 사용할 URL - 썸네일 이미지 파일
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
