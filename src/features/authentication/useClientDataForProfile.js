import { useQuery } from "@tanstack/react-query";
import {getClientInfoForProfile } from "../../services/apiAuthClient";

export function useAuthClient(userId, refLink) {
  const { data } = useQuery({
    queryKey: ["clientData"],
    queryFn: () => getClientInfoForProfile(userId, refLink)
  });

  return { data };
}