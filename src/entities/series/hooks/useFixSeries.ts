import { useMutation } from "@tanstack/react-query";
import { FixSeriesRequest, patchfixSeriesApi } from "@entities/series/apis";

export const useFixSeries = () => {
  return useMutation({
    mutationFn: (body: FixSeriesRequest) => patchfixSeriesApi(body),
  });
};
