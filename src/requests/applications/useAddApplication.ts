import useEmpleoApi from "../useEmpleoApi";
import useCustomMutation from "../useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";
import ApplicationQueryKeys from ".";
import { Application } from "@/src/utilities/interfaces";

interface AddApplicationProps {
  body: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    gender?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    usCitizen?: boolean;
    usAuthorized?: boolean;
    prevEmployee?: boolean;
    nonCompete?: boolean;
    olderThan18: boolean;
    race?: string;
    hispanicOrLatino?: boolean;
    veteranStatus?: string;
    disabilityStatus?: string;
    workVisa?: boolean;
    languages?: string;
    availableStartDate?: string;
    note?: string;
    relocate?: boolean;
    userId: string;
    resumeUrl?: string;
    coverLetterUrl?: string;
  };
}

const AddApplication = async ({
  body,
}: AddApplicationProps): Promise<Application> => {
  const api = useEmpleoApi();
  const { data } = await api.post("/listings", body);

  return data;
};

const useAddApplication = () => {
  const queryClient = useQueryClient();
  return useCustomMutation({
    mutationFn: AddApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ApplicationQueryKeys.all,
      });
    },
  });
};

export default useAddApplication;
