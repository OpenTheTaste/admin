import { useQuery } from "@tanstack/react-query";
import { getSeriesDetailApi } from "@entities/series/apis";

export const useSeriesDetail = (mediaId: number | null) => {
  return useQuery({
    queryKey: ["series", "detail", mediaId],
    queryFn: () => getSeriesDetailApi(mediaId!),
    enabled: mediaId !== null,
  });
};
