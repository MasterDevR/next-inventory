"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import useInventoryStore from "@/components/store/store";
import FormModal from "../modal/form-modal";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

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
      <div className="w-full max-w-6xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Information */}
          <div className="lg:sticky lg:top-4 bg-gray-50 p-6 rounded-xl">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Add Stock
                </h1>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-sm text-blue-700">
                  Important: Stock number must match an existing inventory item
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Use this form to update stock levels for items already in your
                inventory. Enter the stock number and new quantity details
                below.
              </p>
            </div>

            {/* Additional Guidelines */}
            <div className="space-y-4 text-sm text-gray-600">
              <div className="p-4 bg-white rounded-lg border border-gray-100">
                <h3 className="font-medium mb-2">Required Information:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Valid stock number</li>
                  <li>Current price</li>
                  <li>Quantity to add</li>
                  <li>Distributor details</li>
                  <li>Purchase order number</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <form
              onSubmit={submitHandler}
              method="dialog"
              className="space-y-4"
              id="add-stock-form"
            >
              <div className="space-y-4">
                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Stock No.
                  </label>
                  <input
                    name="stock_no"
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
                    step="0.01"
                    min="0"
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
                    min="1"
                    required
                    placeholder="Enter quantity"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Purchase Order
                  </label>
                  <input
                    name="purchase_order"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Stock"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </FormModal>
  );
};

export default AddStock;
