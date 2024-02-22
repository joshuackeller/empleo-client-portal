import { Listing } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";
import ListingsKeys from ".";

interface GetListingsProps {}

export const GetListings = async ({}: GetListingsProps): Promise<Listing[]> => {
  const api = useEmpleoApi();

  const { data } = await api.get(`/listings`);

  return data;
};

const useGetListings = () => {
  return useQuery({
    queryKey: ListingsKeys.current,
    queryFn: GetListings,
  });
};

export default useGetListings;
