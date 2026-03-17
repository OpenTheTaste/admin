import { useMutation } from "@tanstack/react-query";
import { UploadSeriesRequest, uploadSeriesApi } from "@entities/series/apis";

export const useUploadSeries = () => {
  return useMutation({
    mutationFn: (body: UploadSeriesRequest) => uploadSeriesApi(body),
  });
};
