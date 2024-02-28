import { Organization } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";

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
