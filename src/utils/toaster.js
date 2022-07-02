import { toast } from "react-toastify";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const Toaster = (type = 1, msg) => {
  if (type === 1) {
    toast.success(capitalizeFirstLetter(msg));
  } else if (type === 2) {
    toast.error(capitalizeFirstLetter(msg));
  } else if (type === 3) {
    toast.warning(capitalizeFirstLetter(msg));
  } else if (type === 4) {
    toast.info(capitalizeFirstLetter(msg));
  } else {
    toast.success(capitalizeFirstLetter(msg));
  }
};
