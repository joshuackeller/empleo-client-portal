import { useQuery } from "@tanstack/react-query";
import useEmpleoApi from "../useEmpleoApi";
import { Listing } from "@/src/utilities/interfaces";
import ListingQueryKeys from ".";

interface GetListingProps {
  listingId: string;
  slug?: string;
}

export const GetListing = async ({
  listingId,
  slug,
}: GetListingProps): Promise<Listing> => {
  const api = useEmpleoApi(slug);

  const { data } = await api.get(`/listings/${listingId}`);

  return data;
};

const useGetListing = (listingId: string) => {
  return useQuery({
    queryFn: () => GetListing({ listingId }),
    queryKey: ListingQueryKeys.single(listingId),
    enabled: !!listingId,
  });
};

export default useGetListing;
