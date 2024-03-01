import useEmpleoApi from "../useEmpleoApi";
import { Application } from "@/src/utilities/interfaces";

interface CreateApplicationProps {
  body: {
    firstName?: string;
    lastName?: string;
    linkedInUrl?: string;
    phone?: string;
    availableStartDate?: string;
    note?: string;
    resume?: any;
    resumeName?: string;
    coverLetter?: any;
    coverLetterName?: string;
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
