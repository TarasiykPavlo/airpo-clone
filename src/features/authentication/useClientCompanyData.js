import { useQuery } from "@tanstack/react-query";
import { getCompanyData } from "../../services/apiAuthClient";

export function getUserCompany(userId) {
  const { data } = useQuery({
    queryKey: ["company"],
    queryFn: () => getCompanyData(userId)
  });
 
  return { data };
}