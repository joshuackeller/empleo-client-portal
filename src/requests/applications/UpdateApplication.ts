import useEmpleoApi from "../useEmpleoApi";
import { Application } from "@/src/utilities/interfaces";

interface UpdateApplicationProps {
  body: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipe?: string;
    linkedInUrl?: string;
    availableStartDate?: string;
    resume?: any;
    resumeName?: string;
    coverLetter?: any;
    coverLetterName?: string;
    note?: string;
    eeocRace?: string;
    eeocVeteranStatus?: string;
    eeocDisabilityStatus?: string;
    eeocGender?: string;
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
