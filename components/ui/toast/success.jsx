import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuccessToast = ({ message }) => {
  toast.success(`${message}`, {
    position: "top-center",
  });
  return <ToastContainer />;
};

export default SuccessToast;
