import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadSeriesRequest, uploadSeriesApi } from "@entities/series/apis";

export const useUploadSeries = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UploadSeriesRequest) => uploadSeriesApi(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["series", "list"] });
    },
  });
};
