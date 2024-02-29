import useEmpleoApi from "../useEmpleoApi";

interface GetApplicationProps {
  applicationId?: string;
  slug?: string;
}

export const GetApplication = async ({
  applicationId,
  slug,
}: GetApplicationProps) => {
  const api = useEmpleoApi(slug);

  const { data } = await api.get(`/applications/${applicationId}`);

  return data;
};
