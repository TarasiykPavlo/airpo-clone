import { useQuery } from "@tanstack/react-query";
import { getClientTemlates } from "../../services/apiAuthClient";

export function useClientTemlates(userId) {
  const { data } = useQuery(
    ["clientTemplates"],
    () => getClientTemlates(userId),
    { refetchInterval: 1000 }
  );
 
  return { data };
}