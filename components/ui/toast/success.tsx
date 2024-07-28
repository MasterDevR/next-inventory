import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type successToastProps = {
  message: String;
};

const SuccessToast = ({ message }: successToastProps) => {
  toast.success(`${message}`, {
    position: "top-center",
  });
  return <ToastContainer />;
};

export default SuccessToast;
