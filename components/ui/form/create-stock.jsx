"use client";
import React, { useRef, useState } from "react";
import StockType from "../select/select-stock-type";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import useInventoryStore from "@/components/store/store";
import FormModal from "@/components/ui/modal/form-modal";
import Input from "@/components/ui/input/Input";
const InventoryForm = () => {
  const queryClient = useQueryClient();
  const modalRef = useRef();
  const { updateSuccessModal, updateModalMessage, updateStatuss, token } =
    useInventoryStore();
  const [stockType, setStockType] = useState();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/create-stock`,
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
      const formData = new FormData(e.target);

      formData.append("stockType", stockType);
      mutation.mutate(formData, {
        onSuccess: (response) => {
          if (response && response.data) {
            console.log(response);
            updateSuccessModal(true);
            updateModalMessage(response.data.message);
            updateStatuss(response.data.status);
            queryClient.invalidateQueries({ queryKey: ["stock"] });
          }
        },
        onError: (error) => {
          console.log(error);
          updateSuccessModal(true);
          updateModalMessage(error.message);
          updateStatuss(error.status);
        },
      });

      // const form = e.target;
      // form.reset();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <FormModal id="create-stock" className="modal" modalRef={modalRef}>
      <h3 className="pt-2 text-center text-lg font-bold tracking-widest text-green-500">
        ADD ITEM
      </h3>
      <div className="divider"></div>
      <div className="modal-action flex flex-col">
        <form
          className="  space-y-5 "
          id="create-stock-form"
          onSubmit={submitHandler}
        >
          <Input name="name" title={"Item"} type={"text"} />
          <Input name="price" title={"Price"} type={"number"} />
          <Input name="quantity" title={"Quantity"} type={"number"} />
          <Input name="description" title={"Description"} type={"text"} />
          <Input name="measurement" title={"Measurement"} type={"text"} />
          <Input name="stock" title={"Stock No."} type={"text"} />
          <Input name="order" title={"Re-Order-Point"} type={"text"} />
          <Input name="reference" title={"Reference"} type={"text"} />
          <Input name="consume" title={"Date To Consume"} type={"number"} />
          <Input name="distributor" title={"Distributor"} type={"text"} />
          <Input name="purchase_order" title={"P.O Number."} type={"text"} />
          <Input name="date" title={"Date"} type={"date"} />
          <Input name="image" title={" "} type={"file"} />
          <StockType onChange={setStockType} />
          <button
            className="btn btn-success mt-5 w-full font-bold text-white"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </FormModal>
  );
};

export default React.memo(InventoryForm);
