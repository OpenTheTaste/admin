import { api } from "@shared/api";
import {
  ApiResponse,
  BasePaginationParams,
  IngestJobListResponse,
} from "@shared/types";

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
