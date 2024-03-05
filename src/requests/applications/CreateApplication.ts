import useEmpleoApi from "../useEmpleoApi";
import { Application } from "@/src/utilities/interfaces";

interface CreateApplicationProps {
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
  listingId: string;
}

export const CreateApplication = async ({
  body,
  listingId,
}: CreateApplicationProps): Promise<Application> => {
  const api = useEmpleoApi();
  const { data } = await api.post(`/listings/${listingId}/applications`, body);

  return data;
};
