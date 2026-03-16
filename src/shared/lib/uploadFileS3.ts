import { api } from "@shared/api";
import { ApiResponse, PageInfo } from "@shared/types";

// S3 단일 파일 업로드 (포스터, 썸네일용)
export const uploadFileToS3 = async (uploadUrl: string, file: File) => {
  await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });
};

export interface UploadedPart {
  partNumber: number;
  eTag: string;
}

interface PartUploadItem {
  partNumber: number;
  uploadUrl: string;
}

interface PartPageResponse {
  pageInfo: PageInfo;
  dataList: PartUploadItem[];
}

// 멀티파트 업로드용 Presigned URL 페이지 단위 조회 (콘텐츠)
export const getContentsPartUploadUrls = async (
  contentsId: number,
  objectKey: string,
  uploadId: string,
  page: number,
  size: number,
): Promise<PartPageResponse> => {
  const res = await api.get<ApiResponse<PartPageResponse>>(
    `/admin/contents/${contentsId}/upload/parts`,
    {
      params: { objectKey, uploadId, page, size },
    },
  );
  return res.data.data;
};

// 멀티파트 업로드용 Presigned URL 페이지 단위 조회 (숏폼)
export const getShortFormPartUploadUrls = async (
  contentsId: number,
  objectKey: string,
  uploadId: string,
  page: number,
  size: number,
): Promise<PartPageResponse> => {
  const res = await api.get<ApiResponse<PartPageResponse>>(
    `/short-forms/${contentsId}/upload/parts`,
    {
      params: { objectKey, uploadId, page, size },
    },
  );
  return res.data.data;
};

type GetPartUploadUrlsFn = (
  contentsId: number,
  objectKey: string,
  uploadId: string,
  page: number,
  size: number,
) => Promise<PartPageResponse>;

// 원본 영상 멀티파트 업로드
// - 페이지 단위로 Presigned URL 조회 후 파트별 청크 분할 PUT
// - 각 파트의 ETag를 수집해 반환 (complete API에서 사용)
export const uploadVideoMultipart = async (
  contentsId: number,
  uploadId: string,
  objectKey: string,
  file: File,
  partSizeBytes: number,
  totalPartCount: number,
  getPartUrls: GetPartUploadUrlsFn, // 콘텐츠/숏폼 URL 조회 함수 주입
  onProgress?: (uploadedParts: number, totalParts: number) => void,
  pageSize = 100,
): Promise<UploadedPart[]> => {
  const parts: UploadedPart[] = [];

  let page = 0;
  let totalPage = 1; // 첫 응답 전 임시값, 이후 실제 totalPage로 갱신

  while (page < totalPage) {
    const { pageInfo, dataList } = await getPartUrls(
      contentsId,
      objectKey,
      uploadId,
      page,
      pageSize,
    );

    totalPage = pageInfo.totalPage;

    for (let i = 0; i < dataList.length; i++) {
      const { partNumber, uploadUrl } = dataList[i];

      // 파트 크기 단위로 청크 분할 (마지막 파트는 남은 크기만큼)
      const start = (partNumber - 1) * partSizeBytes;
      const end = Math.min(start + partSizeBytes, file.size);
      const chunk = file.slice(start, end);

      // S3 직접 PUT (Presigned URL 사용, 인증 헤더 불필요)
      const res = await fetch(uploadUrl, {
        method: "PUT",
        body: chunk,
      });

      if (!res.ok) throw new Error(`Part ${partNumber} upload failed`);

      const eTag = res.headers.get("ETag");
      if (!eTag) throw new Error(`Part ${partNumber}: ETag header missing`);

      parts.push({ partNumber, eTag });
      onProgress?.(parts.length, totalPartCount);
    }

    page++;
  }

  return parts;
};
