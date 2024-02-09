import { useQuery } from "@tanstack/react-query";

import { getClientData } from "../../services/apiAuthClient";

export function useAuthClient(userId) {
  const { data, isLoading } = useQuery({
    queryKey: ["client"],
    queryFn: () => getClientData(userId),
  });
  return { data, isLoading };
}
