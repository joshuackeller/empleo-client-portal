import useEmpleoApi from "../useEmpleoApi";
import { Application } from "@/src/utilities/interfaces";

interface UpdateApplicationProps {
  body: {
    firstName?: string;
    lastName?: string;
    linkedInUrl?: string;
    phone?: string;
    availableStartDate?: string;
    note?: string;
    resume?: any;
    coverLetter?: any;
  };
  applicationId: string;
}

export const UpdateApplication = async ({
  body,
  applicationId,
}: UpdateApplicationProps): Promise<Application> => {
  const api = useEmpleoApi();
  const { data } = await api.put(`/applications/${applicationId}`, body);

  return data;
};
