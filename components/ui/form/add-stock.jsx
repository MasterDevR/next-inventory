"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import useInventoryStore from "@/components/store/store";
import FormModal from "../modal/form-modal";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import Input from "@/components/ui/input/Input";
const AddStock = () => {
  const queryClient = useQueryClient();
  const { updateModalMessage, updateSuccessModal, updateStatuss, token } =
    useInventoryStore();
  const modalRef = useRef();
  const [isSubmitting, setSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: async (formData) => {
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
            queryClient.invalidateQueries({ queryKey: ["stock"] });
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
    <FormModal id="add-stock" modalRef={modalRef}>
      <h1 className=" lg:text-xl text-center p-2 uppercase text-green-500 font-bold">
        Add Stock To Existing Item
      </h1>
      <form
        onSubmit={submitHandler}
        method="dialog"
        className="flex flex-col justify-between gap-5 bg-inherit lg:w-5/6 mx-auto w-full "
        id="add-stock-form"
      >
        <Input name="stock_no" title={"Stock No."} type={"text"} />
        <Input name="price" title={"Price"} type={"number"} />
        <Input name="quantity" title={"Quantity"} type={"number"} />
        <Input name="distributor" title={"Distributor"} type={"text"} />
        <Input name="purchase_order" title={"P.O"} type={"text"} />
        <Input name="purchase_request" title={"P.R"} type={"text"} />

        <button
          type="submit"
          className="btn btn-success btn-outline font-bold tracking-widest"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </FormModal>
  );
};

export default AddStock;
