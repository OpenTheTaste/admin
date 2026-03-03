import { useQuery } from "@tanstack/react-query";
import {
  GetContentListParams,
  getContentDetailApi,
  getContentListApi,
} from "@entities/video-contents/apis";

export const useContentList = (params: GetContentListParams) => {
  return useQuery({
    queryKey: ["contents", "list", params],
    queryFn: () => getContentListApi(params),
  });
};

export const useContentDetail = (mediaId: number) => {
  return useQuery({
    queryKey: ["contents", "detail", mediaId],
    queryFn: () => getContentDetailApi(mediaId),
    enabled: !!mediaId,
  });
};
