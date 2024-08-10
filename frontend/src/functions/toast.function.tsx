import { toast } from "react-toastify";

const setSuccessToast = (toastMessage: string) => {
  return toast.success(toastMessage, {
    position: "top-center",
  });
};

const setErrorToast = (errKey: string) => {
  return toast.error(errKey, {
    position: "top-center",
  });
};

const setCustomErrorToast = (error: string) => {
  return toast.error(error, {
    position: "top-center",
  });
};

export { setSuccessToast, setErrorToast, setCustomErrorToast };
