import useEmpleoApi from "../useEmpleoApi";
import useCustomMutation from "../useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";
import ApplicationQueryKeys from ".";
import { Application } from "@/src/utilities/interfaces";

interface AddApplicationProps {
  body: {
    firstName?: string;
    lastName?: string;
    linkedInUrl?: string;
    phone?: string;
    availableStartDate?: string;
    note?: string;
  };
  listingId: string;
}

export const AddApplication = async ({
  body,
  listingId,
}: AddApplicationProps): Promise<Application> => {
  const api = useEmpleoApi();
  const { data } = await api.post(`/listings/${listingId}/applications`, body);

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
