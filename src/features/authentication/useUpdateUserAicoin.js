import { useQueryClient, useMutation } from "@tanstack/react-query";

import { updateCurrentUserAicoin } from "../../services/apiAuthClient";

export function useUpdateUserAicoin() {
	const queryClient = useQueryClient();

	const { mutate: updateUserAicoin } = useMutation({
		mutationFn: updateCurrentUserAicoin,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (err) => console.log(err.message),
	});

	return { updateUserAicoin };
}
