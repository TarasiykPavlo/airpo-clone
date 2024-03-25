import { useQuery } from "@tanstack/react-query";
import { selectShopItems } from "../../services/apiAuthClient";

export function useShopItems() {
  const { data } = useQuery({
    queryKey: ["ShopItems"],
    queryFn: selectShopItems
  });
 
  return { data };
}