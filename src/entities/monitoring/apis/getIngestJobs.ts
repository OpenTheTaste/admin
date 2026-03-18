import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse, BasePaginationParams, PageInfo } from "@shared/types";

export type IngestStatus =
  | "PENDING"
  | "PROCESSING"
  | "PARTIAL_SUCCESS"
  | "SUCCESS"
  | "FAIL";

export const INGEST_STATUS = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  PARTIAL_SUCCESS: "PARTIAL_SUCCESS",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
} as const;

export const INGEST_STATUS_LABEL: Record<IngestStatus, string> = {
  PENDING: "대기",
  PROCESSING: "작업 중",
  PARTIAL_SUCCESS: "부분 성공",
  SUCCESS: "성공",
  FAIL: "실패",
};

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
    END_POINTS.INGEST_JOBS,
    { params: { page, size, searchWord } },
  );
  return res.data.data;
};
