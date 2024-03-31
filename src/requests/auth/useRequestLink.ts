import useEmpleoApi from "../useEmpleoApi";

interface RequestLinkProps {
  body: {
    email: string;
    returnRoute: string;
    cloudflareToken: string;
    listingId?: string;
  };
  slug?: string;
}

export const RequestLink = async ({ body, slug }: RequestLinkProps) => {
  const api = useEmpleoApi(slug);

  const { data } = await api.post("/auth/request_link", body);

  return data;
};
