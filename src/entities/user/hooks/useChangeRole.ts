import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeRoleParams, patchchangeRoleApi } from "@entities/user/apis";

export const useChangeRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberId,
      params,
    }: {
      memberId: number;
      params: ChangeRoleParams;
    }) => patchchangeRoleApi(memberId, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
};
