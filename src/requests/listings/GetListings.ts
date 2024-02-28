import { Listing } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";

interface GetListingsProps {
  search?: string;
  slug?: string;
}

export const GetListings = async ({
  search,
  slug,
}: GetListingsProps): Promise<Listing[]> => {
  const api = useEmpleoApi(slug);

  const { data } = await api.get(`/listings`, {
    params: {
      search,
    },
  });

  return data;
};
