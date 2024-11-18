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
    <FormModal id="create-stock" modalRef={modalRef}>
      <div className="w-full max-w-3xl mx-auto px-6 py-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 justify-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Create New Item
            </h1>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-sm text-blue-700">
              Important: Fill in all required details to add a new item to
              inventory
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Use this form to create a new inventory item. Please provide
            complete item details below.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <form
            onSubmit={submitHandler}
            className="space-y-6"
            id="create-stock-form"
          >
            {/* Basic Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Item Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Enter item name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Item Description
                </label>
                <input
                  name="description"
                  type="text"
                  required
                  placeholder="Enter item name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stock No.
                </label>
                <input
                  name="stock"
                  type="text"
                  required
                  placeholder="Enter stock number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price
                </label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Quantity
                </label>
                <input
                  name="quantity"
                  type="number"
                  min="0"
                  required
                  placeholder="Enter quantity"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Measurement
                </label>
                <input
                  name="measurement"
                  type="text"
                  required
                  placeholder="Enter measurement"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Re-Order Point
                </label>
                <input
                  name="order"
                  type="text"
                  min="0"
                  required
                  placeholder="Enter reorder point"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Reference
                </label>
                <input
                  name="reference"
                  type="text"
                  required
                  placeholder="Enter reference"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Days to Consume
                </label>
                <input
                  name="consume"
                  type="number"
                  min="1"
                  required
                  placeholder="Enter days to consume"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Distributor
                </label>
                <input
                  name="distributor"
                  type="text"
                  required
                  placeholder="Enter distributor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  P.O Number
                </label>
                <input
                  name="purchase_order"
                  type="text"
                  required
                  placeholder="Enter P.O number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  required
                  placeholder="Enter date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stock Type
                </label>
                <StockType onChange={setStockType} />
              </div>

              <div className="form-control ">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Item Image
                </label>
                <input
                  name="image"
                  type="file"
                  required
                  className=" px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`mt-6 w-full px-4 py-2.5 text-white rounded-md
                bg-blue-600 hover:bg-blue-700 
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200
              `}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create Item"}
            </button>
          </form>
        </div>
      </div>
    </FormModal>
  );
};

export default React.memo(InventoryForm);
