import { useQuery } from "@tanstack/react-query";

import { getClientAicoinHistory } from "../../services/apiAuthClient";

export function useAuthClientData(userId) {
  const { data, isLoading } = useQuery({
    queryKey: ["clientData"],
    queryFn: () => getClientAicoinHistory(userId),
  });
  return { data, isLoading };
}
