import { useQuery } from "@tanstack/react-query";
import { getCompanyGroups } from "../../services/apiAuthClient";

export function useCompanyGroupsData(companyId) {
  const { data } = useQuery({
    queryKey: ["companyGroups"],
    queryFn: () => getCompanyGroups(companyId)
  });
 
  return { data };
}