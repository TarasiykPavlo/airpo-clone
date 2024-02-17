import { useQuery } from "@tanstack/react-query";
import { getCompanyDataForSettings } from "../../services/apiAuthClient";

export function getCompanyData(companyId) {
  const { data } = useQuery({
    queryKey: ["company"],
    queryFn: () => getCompanyDataForSettings(companyId)
  });
 
  return { data };
}