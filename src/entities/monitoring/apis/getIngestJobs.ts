import { api } from "@shared/api";
import { ApiResponse, BasePaginationParams, PageInfo } from "@shared/types";

export type IngestStatus =
  | "ORIGIN_UPLOADED" // s3 업로드 완료
  | "TRANSCODING" // 트랜스코딩 중
  | "UPLOADING" // 트랜스코딩된 파일 S3 업로드 중
  | "COMPLETED"; // 전체 완료

export interface IngestJob {
  ingestJobId: number;
  title: string;
  videoSize: number;
  uploaderName: string;
  ingestStatus: IngestStatus;
  progress: number;
}

export interface IngestJobListResponse {
  pageInfo: PageInfo;
  dataList: IngestJob[];
}

export const getIngestJobs = async ({
  page,
  size,
  searchWord,
}: BasePaginationParams) => {
  const res = await api.get<ApiResponse<IngestJobListResponse>>(
    "/ingest-jobs",
    {
      params: { page, size, searchWord },
    },
  );
  return res.data.data;
};
