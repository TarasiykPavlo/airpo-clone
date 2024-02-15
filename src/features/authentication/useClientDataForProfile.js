import { useQuery } from "@tanstack/react-query";
import {getClientInfoForProfile } from "../../services/apiAuthClient";

export function useAuthClient(userId) {
  const { data } = useQuery({
    queryKey: ["clientData"],
    queryFn: () => getClientInfoForProfile(userId)
  });
 
  return { data };
}