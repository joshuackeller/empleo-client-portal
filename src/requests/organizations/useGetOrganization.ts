import { Organization } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";
import OrganizationKeys from ".";

interface GetOrganizationProps {
  slug: string;
}

export const GetOrganization = async ({
  slug,
}: GetOrganizationProps): Promise<Organization> => {
  const api = useEmpleoApi(slug);

  const { data } = await api.get(`/organizations/${slug}`);

  return data;
};

const useGetOrganization = () => {
  let slug = "";
  if (typeof window !== "undefined") {
    const host = window.location.host;
    const domainParts = host.split(".");
    if (domainParts.length > 1) {
      slug = domainParts[0];
    }
  }
  return useQuery({
    queryKey: OrganizationKeys.current,
    queryFn: () => GetOrganization({ slug }),
    enabled: !!slug && slug !== "",
  });
};

export default useGetOrganization;
