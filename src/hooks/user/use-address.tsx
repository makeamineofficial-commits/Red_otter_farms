import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addAddress } from "@/actions/user/address/add.action";
import { editAddress } from "@/actions/user/address/edit.action";
import { deleteAddress } from "@/actions/user/address/delete.action";

type MutationResponse = {
  success: boolean;
  message: string;
};

const handleResponseToast = (res: MutationResponse) => {
  if (res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
  }
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAddress,
    onSuccess: (res: MutationResponse) => {
      handleResponseToast(res);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to add address");
    },
  });
};

export const useEditAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editAddress,
    onSuccess: (res: MutationResponse) => {
      handleResponseToast(res);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update address");
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: (res: MutationResponse) => {
      handleResponseToast(res);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete address");
    },
  });
};
