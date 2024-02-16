import { useQueryClient, useMutation } from "@tanstack/react-query";

import { updateCurrentUserAvatar } from "../../services/apiAuth";

export function useUpdateUserAvatar() {
  const queryClient = useQueryClient();

  const { mutate: updateUserAvatar, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUserAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => console.log(err.message),
  });

  return { updateUserAvatar, isUpdating };
}
