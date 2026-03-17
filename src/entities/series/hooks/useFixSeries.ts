import { useMutation } from "@tanstack/react-query";
import { FixSeriesRequest, fixSeriesApi } from "@entities/series/apis";

export const useFixSeries = () => {
  return useMutation({
    mutationFn: (body: FixSeriesRequest) => fixSeriesApi(body),
  });
};
