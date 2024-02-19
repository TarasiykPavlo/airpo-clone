import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompanies } from "../../services/apiAuthClient";

export function UpdateUserCompanes() {
  const queryClient = useQueryClient();

  const { mutate: updateCompanies } = useMutation({
    mutationFn: ({userId, progType}) => getCompanies(userId, progType).then(console.log(progType)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userCompanies"] });
    },
    onError: (err) => console.log(err.message),
  });
 
  return { updateCompanies };
}