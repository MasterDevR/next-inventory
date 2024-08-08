"use client";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import HideModal from "../button/hide-modal";
import axios from "axios";
import OpenModal from "@/components/ui/button/open-modal";
import useInventoryStore from "@/components/store/store";
const AddStock = () => {
  const { updateModalMessage, updateSuccessModal, updateStatuss } =
    useInventoryStore();
  const modalRef = useRef();
  const [isError, setIsError] = useState({ error: false, message: "" });
  const formik = useFormik({
    initialValues: {
      stock_no: "",
      price: "",
      quantity: "",
      distributor: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/add-stock/${values.stock_no}`,
          values
        );

        if (response.data.status === 404) {
          setIsError({ error: true, message: "Invalid stock number" });
          return;
        } else {
          setIsError({ error: false, message: "" });
          formik.resetForm();
        }
        console.log(response.data);
        updateStatuss(response.data.status);
        updateModalMessage(response.data.message);
        updateSuccessModal(true);
        setSubmitting(false);
      } catch (error) {
        console.log(error.message);
      }
    },
  });
  const handleInputChange = (e) => {
    formik.handleChange(e);
    setIsError({ error: false, message: "" });
  };

  return (
    <dialog id="add-stock" className="modal" ref={modalRef}>
      <div className="modal-box space-y-5 max-w-3xl ">
        <div className="w-fit relative float-end">
          <HideModal modalRef={modalRef} />
        </div>
        <h1 className="text-inherit lg:text-xl text-center p-2">
          Add Stock To Existing Item
        </h1>
        <form
          onSubmit={formik.handleSubmit}
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
              onChange={handleInputChange}
              value={formik.values.stock_no}
            />
          </label>
          {isError.error && (
            <div style={{ color: "red" }}>{isError.message}</div>
          )}
          <label className="input input-bordered flex items-center gap-2">
            Price
            <input
              type="number"
              className="grow font-light"
              placeholder="Price"
              name="price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Quantity
            <input
              type="number"
              className="grow font-light"
              placeholder="Quantity"
              name="quantity"
              onChange={formik.handleChange}
              value={formik.values.quantity}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Distributor
            <input
              type="text"
              className="grow font-light"
              placeholder="Distributor"
              name="distributor"
              onChange={formik.handleChange}
              value={formik.values.distributor}
            />
          </label>
          <button
            type="submit"
            className="btn btn-success btn-outline font-bold tracking-widest"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default AddStock;
