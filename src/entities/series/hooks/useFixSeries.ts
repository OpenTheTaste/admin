import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FixSeriesRequest, fixSeriesApi } from "@entities/series/apis";

export const useFixSeries = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FixSeriesRequest) => fixSeriesApi(body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["series", "list"] });
      queryClient.invalidateQueries({
        queryKey: ["series", "detail", variables.seriesId],
      });
    },
  });
};
