import { useQuery } from "@tanstack/react-query";
import { getCompanyGroups } from "../../services/apiAuthClient";

export function useCompanyGroupsData(companyId) {
  const { data } = useQuery(
    ["companyGroups"],
    () => getCompanyGroups(companyId),
    { refetchInterval: 1000 }
  );
 
  return { data };
}