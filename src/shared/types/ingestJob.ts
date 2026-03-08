import { PageInfo } from "./pagination";

export type IngestStatus =
  | "ORIGIN_UPLOADED"
  | "TRANSCODING"
  | "UPLOADING"
  | "COMPLETED";

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
