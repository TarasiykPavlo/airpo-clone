import { useQuery } from "@tanstack/react-query";
import { getCompanyDataForSettings } from "../../services/apiAuthClient";

export function getCompanyData(companyId) {
  const { data, refetch } = useQuery(
    ["company"], // queryKey
    () => getCompanyDataForSettings(companyId), // queryFn
    { refetchInterval: 1000 } // options
  );
 
  return { data, refetch };
}