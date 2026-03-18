import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { UploadedPart } from "@shared/lib";
import { ApiResponse, PublicStatus } from "@shared/types";

export interface UploadShortsRequest {
  originId: number;
  mediaType: "CONTENTS" | "SERIES";
  title?: string;
  description?: string;
  publicStatus: PublicStatus;
  duration?: number;
  videoSize?: number;
  posterFileName?: string;
  thumbnailFileName?: string;
  originFileName?: string;
}

export interface UploadShortsResponse {
  shortFormId: number;
  posterObjectKey: string;
  thumbnailObjectKey: string;
  originObjectKey: string;
  masterPlaylistObjectKey: string;
  posterUploadUrl: string; // S3에 업로드할 때 사용할 URL - 포스터 이미지 파일
  thumbnailUploadUrl: string; // S3에 업로드할 때 사용할 URL - 썸네일 이미지 파일
  originUploadId: string;
  originTotalPartCount: number;
  originPartSizeBytes: number;
}

// 콘텐츠 업로드 API
export const uploadShortsApi = async (body: UploadShortsRequest) => {
  const res = await api.post<ApiResponse<UploadShortsResponse>>(
    END_POINTS.SHORT_FORMS_UPLOAD,
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
  shortformId: number,
  body: CompleteMultipartRequest,
) => {
  const res = await api.post<ApiResponse<void>>(
    END_POINTS.SHORT_FORMS_MULTIPART_COMPLETE(shortformId),
    body,
  );
  return res.data;
};

export interface UpdateShortsRequest {
  originId: number;
  mediaType: "CONTENTS" | "SERIES";
  title?: string;
  description?: string;
  publicStatus: PublicStatus;
  posterFileName?: string;
}

// 콘텐츠 수정 API
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
