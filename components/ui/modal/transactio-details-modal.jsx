"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import useInventoryStore from "@/components/store/store";
import FormModal from "@/components/ui/modal/form-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Download_Report from "@/components/report/summary/download-btn";
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
    department_id,
    Status,
    TransactionType,
    user,
    ris,
    transaction_item = [],
  } = transactionDetails || {};
  const [quantities, setQuantities] = useState({});
  const [totals, setTotals] = useState({});

  const handleQuantityChange = (index, value, price) => {
    const quantity = parseInt(value, 10);
    const total = quantity * price;

    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: quantity,
    }));

    setTotals((prevTotals) => ({
      ...prevTotals,
      [index]: total,
    }));
  };

  return (
    <FormModal id="transactipn-details" modalRef={modalRef}>
      {Status?.name !== "pending" && Status?.name !== "rejected" && (
        <header className="float-start relative bottom-10">
          <Download_Report tableRef={tableRef} status={200} />
        </header>
      )}

      <div className="border border-black text-base mt-10">
        <form onSubmit={handleSubmit} className="overflow-x-auto  w-full">
          <input type="hidden" name="transaction_id" value={id} />
          <input type="hidden" name="created_at" value={created_at} />
          <input type="hidden" name="department_id" value={department_id} />
          <input type="hidden" name="status" value={Status?.name} />
          <input
            type="hidden"
            name="transactionType"
            value={TransactionType?.name}
          />
          <input
            type="hidden"
            name="user_department_code"
            value={user?.department_code}
          />

          <table className="table " ref={tableRef}>
            <thead>
              <tr>
                <td
                  className="text-center p-4 font-bold lg:text-2xl "
                  colSpan="6"
                >
                  REQUISITION AND ISSUE SLIP
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  LGU :{" "}
                  <span className="underline"> Universidad De Manila</span>
                </td>
              </tr>

              <tr>
                <td colSpan="4">
                  Division :
                  <span className="underline uppercase">
                    Universidad De Manila
                  </span>
                </td>
                <td colSpan="1">
                  <td>{`FPP CODE : 3323(014)`}</td>
                </td>
                <td colSpan="2">
                  <td>RC # : AD-003e</td>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  Office :
                  <span className="underline uppercase">
                    {user && ` ${user.department} & (${user.department_code})`}
                  </span>
                </td>
                <td>
                  <td colSpan="1">{`RIS No. : ${year}-${month}-${
                    ris ? ris : 0
                  }`}</td>
                </td>
                <td>
                  <td colSpan="2">{`Date: ${new Date().toLocaleDateString(
                    "en-GB"
                  )}`}</td>
                </td>
              </tr>
              <tr className="text-center text-black text-lg">
                <td colSpan={4} className="border border-black">
                  Requisition
                </td>
                <td colSpan={2} className="border border-black">
                  Issuance
                </td>
              </tr>
              <tr className="text-black text-center">
                <th>Stock No.</th>
                <th>Unit</th>
                <th>Item</th>
                <th> Quantity</th>
                <th> Quantity</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {transaction_item.length > 0 ? (
                transaction_item.map((item, index) => (
                  <tr
                    key={item.stock.item + index}
                    className="text-center border-black "
                  >
                    <td className="w-32">
                      {item.stock_no}

                      <input
                        type="hidden"
                        name={`stock_no_${index}`}
                        value={item.stock_no}
                      />
                    </td>
                    <td className="">{item.stock.measurement}</td>
                    <td className="">{item.stock.item}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {Status?.name === "pending" ? (
                        <>
                          <input
                            type="number"
                            disabled={Status?.name !== "pending"}
                            name={`approved_quantity_${index}`}
                            className="w-16 border-black border text-center"
                            defaultValue={1}
                            min={0}
                            value={
                              quantities[index] !== undefined
                                ? quantities[index]
                                : 1
                            } // Explicit check for undefined
                            onChange={
                              role === "staff"
                                ? (e) =>
                                    handleQuantityChange(
                                      index,
                                      Number(e.target.value), // Convert to number
                                      item.stock.price
                                    )
                                : undefined // No handler if not "staff"
                            }
                          />
                          <input
                            type="hidden"
                            name={`item_id_${index}`}
                            value={item.id}
                          />
                          <input
                            type="hidden"
                            name={`quantity_${index}`}
                            value={item.quantity}
                          />
                        </>
                      ) : (
                        <>{item.approved_quantity}</>
                      )}
                    </td>
                    <td>
                      {item.stock.price} / {totals[index] || item.stock.price}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No items available</td>
                </tr>
              )}
            </tbody>
          </table>
          <>
            {role === "staff" && Status?.name === "pending" && (
              <div className="mt-4 flex flex-row justify-around">
                <button
                  type="submit"
                  className="btn btn-success text-white w-2/6"
                >
                  Approve Request
                </button>
                <button
                  type="button"
                  className="btn btn-error btn-outline text-white w-2/6"
                  onClick={handleReject}
                >
                  Reject Request
                </button>
              </div>
            )}

            {role === "staff" && Status?.name === "approved" && (
              <div className="w-full p-5 text-center">
                <button
                  type="button"
                  className="btn btn-success tracking-widest w-full btn-outline"
                  onClick={handleReady}
                >
                  Ready
                </button>
              </div>
            )}
          </>
        </form>
      </div>
    </FormModal>
  );
};

export default Transaction_Details_Modal;
