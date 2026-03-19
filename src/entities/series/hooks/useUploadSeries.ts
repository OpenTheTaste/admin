import { useMutation } from "@tanstack/react-query";
import {
  UploadSeriesRequest,
  postuploadSeriesApi,
} from "@entities/series/apis";

export const useUploadSeries = () => {
  return useMutation({
    mutationFn: (body: UploadSeriesRequest) => postuploadSeriesApi(body),
  });
};
