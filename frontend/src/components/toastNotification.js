import { Bounce, toast } from "react-toastify";

// message popup for success
export const ToastSuccess = (successMessage) => {
  return toast.success(successMessage, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

// message popup for success
export const ToastError = (errorMessage) => {
  return toast.error(errorMessage, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};
