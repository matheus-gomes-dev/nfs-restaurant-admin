import { ToastOptions } from "react-toastify";

export const toastConfig: ToastOptions = {
  autoClose: 2000,
  position: "top-right",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "dark",
  style: {
    position: 'relative',
    top: '60px',
  }
}