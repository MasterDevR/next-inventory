"use client";
import React from "react";
import { IoWarning } from "react-icons/io5";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useInventoryStore from "@/components/store/store";

const VerifyAction = ({ stock_no, id, modalRef }) => {
  const queryClient = useQueryClient();
  const { updateStatuss, updateModalMessage, updateSuccessModal } =
    useInventoryStore();
  const cancelDelete = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const deleteHandler = async ({ stock_no }) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/delete-item/${stock_no}`
      );

      return response.data;
    } catch (error) {
      console.log(error.message);
      updateModalMessage(error.response?.data?.message || "An error occurred");
    }
  };

  const mutation = useMutation({
    mutationFn: deleteHandler,
    onSuccess: (data) => {
      updateStatuss(data.status);
      updateModalMessage(data.message);
      updateSuccessModal(true);
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      updateStatuss(500);
      updateModalMessage(error.response?.data?.message || "An error occurred");
      updateSuccessModal(true);
    },
  });
  return (
    <dialog id={`modal-${id}`} className="modal" ref={modalRef}>
      <div className="modal-box space-y-10">
        <section className="flex flex-col justify-center items-center gap-y-5">
          <IoWarning
            size={"3rem"}
            className="font-bold text-red-500 text-lg "
          />
          <h3 className="font-bold text-red-500 text-lg">
            Are your sure you want to delete this item?
          </h3>
        </section>
        <div className="  flex flex-row justify-around">
          <button
            className="btn btn-success btn-outline"
            onClick={cancelDelete}
          >
            Cancel
          </button>
          <button
            className="btn btn-error  text-inherit"
            onClick={() =>
              mutation.mutate({
                stock_no: stock_no,
              })
            }
          >
            Delete Item
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default React.memo(VerifyAction);
