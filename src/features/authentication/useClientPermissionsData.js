import { useQuery } from "@tanstack/react-query";
import { selectClientsPermissions } from "../../services/apiAuthClient";

export function usePermissionsData(userId) {
  const { data } = useQuery({
    queryKey: ["userPermissions"],
    queryFn: () => selectClientsPermissions(userId)
  });
 
  return { data };
}