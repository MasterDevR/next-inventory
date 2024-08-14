"use client";
import React, { useRef, useState } from "react";
import HideModal from "../button/hide-modal";
import axios from "axios";
import useInventoryStore from "@/components/store/store";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
const AddStock = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const { updateModalMessage, updateSuccessModal, updateStatuss } =
    useInventoryStore();
  const modalRef = useRef();
  const [isSubmitting, setSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const token = session.data?.user.accessToken;
      let stock_no = formData.get("stock_no");
      return await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/add-stock/${stock_no}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setSubmitting(true);
      const formData = new FormData(e.target);
      mutation.mutate(formData, {
        onSuccess: (response) => {
          if (response && response.data) {
            updateSuccessModal(true);
            updateModalMessage(response.data.message);
            updateStatuss(response.data.status);
            queryClient.invalidateQueries({ queryKey: ["items"] });
          }
        },
        onError: (error) => {
          updateSuccessModal(true);
          updateModalMessage(error.message);
          updateStatuss(error.status);
        },
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <dialog id="add-stock" className="modal" ref={modalRef}>
      <div className="modal-box space-y-5 max-w-3xl ">
        <div className="w-fit relative float-end">
          <HideModal modalRef={modalRef} />
        </div>
        <h1 className=" lg:text-xl text-center p-2 uppercase text-green-500 font-bold">
          Add Stock To Existing Item
        </h1>
        <form
          onSubmit={submitHandler}
          method="dialog"
          className="flex flex-col justify-between gap-5 bg-inherit lg:w-5/6 mx-auto w-full "
          id="add-stock-form"
        >
          <label className="input input-bordered flex items-center gap-2">
            Stock No.
            <input
              type="text"
              className="grow font-light"
              placeholder="Stock Number"
              name="stock_no"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Price
            <input
              type="number"
              className="grow font-light"
              placeholder="Price"
              name="price"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Quantity
            <input
              type="number"
              className="grow font-light"
              placeholder="Quantity"
              name="quantity"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Distributor
            <input
              type="text"
              className="grow font-light"
              placeholder="Distributor"
              name="distributor"
            />
          </label>
          <button
            type="submit"
            className="btn btn-success btn-outline font-bold tracking-widest"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default AddStock;
