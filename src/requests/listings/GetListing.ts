import useEmpleoApi from "../useEmpleoApi";
import { Listing } from "@/src/utilities/interfaces";

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
