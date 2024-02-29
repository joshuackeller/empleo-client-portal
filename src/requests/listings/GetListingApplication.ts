import useEmpleoApi from "../useEmpleoApi";

interface GetListingApplicationProps {
  listingId?: string;
  slug?: string;
}

export const GetListingApplication = async ({
  listingId,
  slug,
}: GetListingApplicationProps) => {
  const api = useEmpleoApi(slug);

  const { data } = await api.get(`/listings/${listingId}/applications`);

  return data;
};
