"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import useInventoryStore from "@/components/store/store";
import FormModal from "@/components/ui/modal/form-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Download_Report from "@/components/report/summary/download-btn";
import { FaCheck } from "react-icons/fa";
const Transaction_Details_Modal = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const modalRef = useRef();
  const tableRef = useRef();
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
          console.log(response.data);
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
  } = transactionDetails || {};

  // Add status check helper
  const isStatusApproved = Status?.name === "approved";
  const isStatusPending = Status?.name === "pending";

  return (
    <FormModal id="transactipn-details" modalRef={modalRef}>
      <div className="p-4 sm:p-6 w-full max-w-3xl mx-auto">
        {/* Header & Status */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Transaction Details
          </h2>
          <span
            className={`
            px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap
            ${
              Status?.name === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : Status?.name === "approved"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }
          `}
          >
            {Status?.name}
          </span>
        </div>

        {/* Transaction Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Transaction Details Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-700 mb-3">Transaction Info</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <span className="text-sm w-20">ID:</span>
                <span className="text-sm font-medium">{id}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-sm w-20">Date:</span>
                <span className="text-sm font-medium">
                  {new Date(created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Requestor Details Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-700 mb-3">Requestor Info</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <span className="text-sm w-20">Type:</span>
                <span className="text-sm font-medium">
                  {TransactionType?.name}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-sm w-20">Department:</span>
                <span className="text-sm font-medium">{user?.department}</span>
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
            <table className="hidden sm:table w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-center text-xs font-medium text-white  uppercase tracking-wider w-1/3">
                    Item
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-white  uppercase tracking-wider w-1/6">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-white  uppercase tracking-wider w-1/6">
                    Unit
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-white  uppercase tracking-wider w-1/3">
                    Status
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
                      {item.quantity}
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
                          {item.approved_quantity || item.quantity}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
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
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  Approve
                </button>
              </>
            ) : isStatusApproved ? (
              <button
                type="button"
                onClick={handleReady}
                className="w-full cursor-pointer sm:w-auto px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <FaCheck className="w-4 h-4" />
                Mark as Ready
              </button>
            ) : null}
          </div>
        )}
      </div>
    </FormModal>
  );
};

export default Transaction_Details_Modal;
