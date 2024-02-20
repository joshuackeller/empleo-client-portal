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
    workVisa?: boolean;
    languages?: string;
    availableStartDate?: string;
    note?: string;
    relocate?: boolean;
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
