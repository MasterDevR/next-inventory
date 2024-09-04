"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import useInventoryStore from "@/components/store/store";
import FormModal from "@/components/ui/modal/form-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Transaction_Details_Modal = () => {
  const modalRef = useRef();

  const queryClient = useQueryClient(); // Initialize query client
  const {
    updateSuccessModal,
    updateModalMessage,
    updateStatuss,
    token,
    transactionDetails,
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

  // Mutation for rejecting the transaction
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

  const {
    id,
    created_at,
    department_id,
    Status,
    TransactionType,
    user,
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
      <div className="border border-black text-base mt-10">
        <header className="border-b-2 border-black pl-5">
          <h1 className="text-center p-4 font-bold lg:text-2xl">
            REQUISITION AND ISSUE SLIP
          </h1>
          <h2 className=" mb-5">
            LGU : <span className="underline"> Universidad De Manila</span>
          </h2>
        </header>
        <section className=" h-36 p-5  flex flex-row justify-between  overflow-x-auto gap-x-10 ">
          <div className=" w-96 space-y-5">
            <p className="">
              Division :
              <span className="underline uppercase">
                {" "}
                Universidad De Manila
              </span>
            </p>
            <p className="w-5/6">
              Office :
              <span className="underline uppercase">
                {user && ` ${user.department} & (${user.department_code})`}
              </span>
            </p>
          </div>
          <div className=" space-y-5">
            <p>{`FPP CODE : 3323(014)`}</p>
            <p>{`RIS No. : 2024-05-093`}</p>
          </div>
          <div className="space-y-5">
            <p>{`RC # : AD-003e`}</p>
            <p>{`Date: ${new Date().toLocaleDateString("en-GB")}`}</p>
          </div>
        </section>
        <form onSubmit={handleSubmit} className="overflow-x-auto">
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

          <table className="table  overflow-x-auto">
            {/* head */}
            <thead>
              <tr className="text-center text-black text-lg">
                <td colSpan={4} className="border border-black">
                  Requisition
                </td>
                <td colSpan={2} className="border border-black">
                  Issuance
                </td>
              </tr>
              <tr className="text-black text-center">
                <th className="border border-black"></th>
                <th className="border border-black">Item</th>
                <th className="border border-black">Stock No.</th>
                <th className="border border-black"> Quantity</th>
                <th className="border border-black"> Quantity</th>
                <th className="border border-black">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {transaction_item.length > 0 ? (
                transaction_item.map((item, index) => (
                  <tr key={item.stock.item + index}>
                    <td className="border border-black">{index + 1}</td>
                    <td className="border border-black">{item.stock.item}</td>
                    <td className="border border-black">
                      {item.stock_no}

                      <input
                        type="hidden"
                        name={`stock_no_${index}`}
                        value={item.stock_no}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {item.quantity}
                    </td>
                    <td className="border border-black text-center">
                      <input
                        type="number"
                        disabled={Status?.name !== "pending"}
                        name={`approved_quantity_${index}`}
                        className="w-16  border-black border   text-center"
                        defaultValue={1}
                        min={1}
                        value={quantities[index] || 1}
                        onChange={(e) =>
                          handleQuantityChange(
                            index,
                            e.target.value,
                            item.stock.price
                          )
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
                    </td>
                    <td className="border border-black text-center">
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
            {Status?.name === "pending" && (
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
          </>
        </form>
      </div>
    </FormModal>
  );
};

export default Transaction_Details_Modal;
