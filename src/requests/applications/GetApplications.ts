import useEmpleoApi from "../useEmpleoApi";

interface GetApplicationsProps {
  slug?: string;
}

export const GetApplications = async ({ slug }: GetApplicationsProps) => {
  const api = useEmpleoApi();

  const { data } = await api.get("/applications");

  return data;
};
