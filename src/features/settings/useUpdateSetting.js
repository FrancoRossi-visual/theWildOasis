import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSetting as updateSettingsApi } from "../../services/apiSettings";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdatingSetting } =
    useMutation({
      mutationFn: updateSettingsApi,
      onSuccess: () => {
        toast.success("Setting successfully updated");
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        });
      },
      onError: (error) => toast.error(error.message),
    });

  return { updateSetting, isUpdatingSetting };
}
