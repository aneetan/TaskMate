import { toast } from "react-toastify";

export const showSuccessToast = (message: string) => {
   toast.success(message, {
   position: "top-center",
   autoClose: 3000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: false,
   progress: undefined,
   theme: "light",
   });
}

export const showErrorToast = (message: string) => {
   toast.error(message, {
   position: "top-center",
   autoClose: 3000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: false,
   progress: undefined,
   theme: "light",
   });
}




