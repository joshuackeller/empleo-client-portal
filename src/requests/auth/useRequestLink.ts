import useCustomMutation from "../useCustomMutation";
import useEmpleoApi from "../useEmpleoApi";

interface RequestLinkProps {
  body: {
    email: string;
    returnRoute: string;
    cloudflareToken: string;
  };
}

const RequestLink = async ({ body }: RequestLinkProps) => {
  const api = useEmpleoApi();

  const { data } = await api.post("/auth/request_link", body);

  return data;
};

const useRequestLink = () => {
  return useCustomMutation({
    mutationFn: RequestLink,
  });
};

export default useRequestLink;
