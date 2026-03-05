import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeRoleApi, ChangeRoleParams } from "@entities/user/apis";

export const useChangeRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, params }: { memberId: number; params: ChangeRoleParams }) =>
      changeRoleApi(memberId, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
};
