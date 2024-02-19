import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../../services/apiAuthClient";

export function getUserCompany(userId, progType) {
  const { data } = useQuery({
    queryKey: ["userCompanies"],
    queryFn: () => getCompanies(userId, progType)
  });
 
  return { data };
}