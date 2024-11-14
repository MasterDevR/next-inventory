"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import useInventoryStore from "@/components/store/store";
import FormModal from "@/components/ui/modal/form-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCheck } from "react-icons/fa";
import RIS_Download_Btn from "@/components/ui/button/download-btn/download-ris-form";
const Transaction_Details_Modal = () => {
  const modalRef = useRef();
  const queryClient = useQueryClient(); // Initialize query client
  const {
    updateSuccessModal,
    updateModalMessage,
    updateStatuss,
    token,
    transactionDetails,
    role,
  } = useInventoryStore();

  // Mutation for approving the transaction
  const approveMutation = useMutation({
    mutationFn: (formData) => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/approve-transaction`,
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

  const rejectMutation = useMutation({
    mutationFn: (formData) => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reject-transaction`,
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
  const readyMutation = useMutation({
    mutationFn: (formData) => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/ready-transaction`,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    approveMutation.mutate(formData, {
      onSuccess: (response) => {
        if (response && response.data) {
          updateSuccessModal(true);
          updateModalMessage(response.data.message);
          updateStatuss(response.data.status);
          queryClient.invalidateQueries({ queryKey: ["transaction"] });
        }
      },
      onError: (error) => {
        updateSuccessModal(true);
        updateModalMessage(error.message);
        updateStatuss(error.response?.status || "error");
      },
    });
  };

  const handleReject = () => {
    const formData = new FormData();
    formData.append("transaction_id", transactionDetails.id);
    formData.append("status", "rejected");

    rejectMutation.mutate(formData, {
      onSuccess: (response) => {
        if (response && response.data) {
          updateSuccessModal(true);
          updateModalMessage(response.data.message);
          updateStatuss(response.data.status);
          queryClient.invalidateQueries({ queryKey: ["transaction"] });
        }
      },
      onError: (error) => {
        updateSuccessModal(true);
        updateModalMessage(error.message);
        updateStatuss(error.response?.status || "error");
      },
    });
  };

  const handleReady = () => {
    const formData = new FormData();
    formData.append("transaction_id", transactionDetails.id);
    formData.append("status", "ready");
    readyMutation.mutate(formData, {
      onSuccess: (response) => {
        if (response && response.data) {
          updateSuccessModal(true);
          updateModalMessage(response.data.message);
          updateStatuss(response.data.status);
          queryClient.invalidateQueries({ queryKey: ["transaction"] });
        }
      },
      onError: (error) => {
        updateSuccessModal(true);
        updateModalMessage(error.message);
        updateStatuss(error.response?.status || "error");
      },
    });
  };
  const {
    id,
    created_at,
    Status,
    TransactionType,
    user,
    transaction_item = [],
    ris,
  } = transactionDetails || {};

  // Add status check helper
  const isStatusApproved = Status?.name === "approved";
  const isStatusPending = Status?.name === "pending";

  return (
    <FormModal id="transactipn-details" modalRef={modalRef}>
      {ris && ris !== null && (
        <div className="relative bottom-7 lg:bottom-10 w-fit">
          <RIS_Download_Btn transactionDetails={transactionDetails} />
        </div>
      )}

      <div className="p-4 sm:p-6 w-full max-w-3xl mx-auto">
        {/* Header & Status */}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Transaction Details
          </h2>

          <h3 className="font-bold underline">
            Status:<span className="font-normal">{` ${Status?.name}`}</span>
          </h3>
        </div>

        {/* Transaction Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Transaction Details Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-700 mb-3">
              Transaction Information
            </h3>
            <div className="space-y-2">
              <div className="flex text-gray-600 gap-y-2">
                <span className="text-sm font-bold w-40">Transaction ID: </span>
                <span className="text-sm font-medium ">{` ${id}`}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <span className="text-sm font-bold w-28 ">Date: </span>
                <span className="text-sm font-medium">
                  {` ${new Date(created_at).toLocaleDateString()}`}
                </span>
              </div>
            </div>
          </div>

          {/* Requestor Details Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-700 mb-3">
              Requestor Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <span className="text-sm font-bold w-28">Type:</span>
                <span className="text-sm font-medium">
                  {TransactionType?.name}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-sm font-bold w-32">Department: </span>
                <span className="text-sm font-medium">{` ${user?.department}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            {/* Mobile View */}
            <div className="block sm:hidden">
              {transaction_item.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-4 border-b border-gray-100"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.stock.item}</span>
                      <span className="text-gray-600">
                        {item.stock.measurement}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Quantity: {item.quantity}
                      </span>
                      {isStatusPending ? (
                        <input
                          type="number"
                          name={`approved_quantity_${index}`}
                          className="w-24 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          defaultValue={item.quantity}
                          min={0}
                        />
                      ) : (
                        <span className="text-gray-600">
                          {item.approved_quantity || item.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="transaction_id" value={id} />

              <table className="hidden sm:table w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/3">
                      Item
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/6">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/6">
                      Unit
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/3">
                      Approve Quantity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transaction_item.map((item, index) => (
                    <tr key={item.id || index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 ">
                        {item.stock.item}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 ">
                        <input
                          type="number"
                          name={`quantity_${index}`}
                          defaultValue={item.quantity}
                        />
                        <input
                          type="hidden"
                          name={`stock_no_${index}`}
                          defaultValue={item.stock_no}
                        />
                        <input
                          type="hidden"
                          name={`item_id_${index}`}
                          defaultValue={item.id}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 ">
                        {item.stock.measurement}
                      </td>
                      <td className="px-4 py-3 text-sm ">
                        {isStatusPending ? (
                          <input
                            type="number"
                            name={`approved_quantity_${index}`}
                            className="w-24 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mx-auto"
                            defaultValue={item.quantity}
                            min={0}
                          />
                        ) : (
                          <span className="text-gray-600">
                            {item.approved_quantity}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {role === "staff" && (
                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
                  {isStatusPending ? (
                    <>
                      <button
                        type="button"
                        onClick={handleReject}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                      >
                        Approve
                      </button>
                    </>
                  ) : isStatusApproved ? (
                    <button
                      type="button"
                      onClick={handleReady}
                      className="w-full btn btn-success btn-outline cursor-pointer"
                    >
                      <FaCheck className="w-4 h-4" />
                      Mark as Ready
                    </button>
                  ) : null}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Action Buttons */}
      </div>
    </FormModal>
  );
};

export default Transaction_Details_Modal;
