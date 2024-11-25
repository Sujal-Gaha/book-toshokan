import { toast } from "sonner";

export const toastSuccess = (message: string) => {
  return toast.success(message);
};

export const toastError = (message: string) => {
  return toast.error(message);
};

export const toastInfo = (message: string) => {
  return toast.info(message);
};
