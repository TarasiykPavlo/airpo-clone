import { useQuery } from "@tanstack/react-query";
import { getClientTemlates } from "../../services/apiAuthClient";

export function useClientTemlates(userId) {
  const { data } = useQuery({
    queryKey: ["clientTemplates"],
    queryFn: () => getClientTemlates(userId)
  });
 
  return { data };
}