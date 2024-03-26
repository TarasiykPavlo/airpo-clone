import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../../services/apiAuthClient";

export function useUserCompany(userId) {
  const { data } = useQuery(
    ["userCompanies"],
    () => getCompanies(userId),
    { refetchInterval: 1000 }
  );
 
  return { data };
}