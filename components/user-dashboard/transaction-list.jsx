"use client";
import React, { useState, useEffect } from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import { useRouter } from "next/navigation";
import DesktopTransactionItem from "./components/DesktopTransactionItem";
import MobileTransactionItem from "./components/MobileTransactionItem";
import EditTransactionModal from "./edit-transaction";
import DeleteTransactionModal from "./delete-transaction";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { AiOutlineExclamationCircle } from "react-icons/ai";
const Transaction_List = () => {
  const queryClient = useQueryClient();
  const [isToInvalidate, setIsToInvalidate] = useState(false);
  const {
    department_id,
    updateModalMessage,
    updateSuccessModal,
    updateStatuss,
    token,
  } = useInventoryStore();
  const router = useRouter();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const { data } = useFetchData({
    path: `/user/get-transaction-history/${department_id}/undefined`,
    token: token,
    key: "transaction-history",
  });
  useEffect(() => {
    if (isToInvalidate === true) {
      queryClient.invalidateQueries({ queryKey: ["transaction-history"] });
    }
  }, [isToInvalidate]);
  const btnHandler = (id) => {
    router.push(`/transaction/${id}`);
  };

  const handleEdit = async (e, item) => {
    e.stopPropagation();
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/edit-transaction/${item.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setSelectedTransaction(response.data.result);
  };

  const handleDelete = (e, item) => {
    e.stopPropagation();
    setTransactionToDelete(item);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  const handleUpdateTransaction = () => {
    setSelectedTransaction(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/delete-transactions/${transactionToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 200) {
        setIsToInvalidate(true);
      }
      updateSuccessModal(true);
      updateModalMessage(response.data.message);
      updateStatuss(response.data.status);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleDeleteCancel = () => {
    setTransactionToDelete(null);
  };

  const itemsPerPage = 10;
  const totalItems = data?.result[0]?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    data?.result[0]?.slice(indexOfFirstItem, indexOfLastItem) || [];

  return (
    <div>
      {/* Check if data is available */}
      {data?.result[0]?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50 rounded-lg shadow-md p-6">
          <AiOutlineExclamationCircle className="h-12 w-12 text-gray-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            No Transactions Yet
          </h2>
          <p className="text-gray-500">
            {`It seems you haven't made any transactions.`}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => router.push("/available-item")}
          >
            Make a Request
          </button>
        </div>
      ) : (
        <>
          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto bg-white min-h-[50vh] shadow-lg rounded-3xl">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="text-base text-center">
                <tr className="bg-gray-200">
                  <th className="p-2 border border-gray-300">No</th>
                  <th className="p-2 border border-gray-300">Purpose</th>
                  <th className="p-2 border border-gray-300">Status</th>
                  <th className="p-2 border border-gray-300">Date</th>
                  <th className="p-2 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <DesktopTransactionItem
                    key={item.id}
                    transaction={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRowClick={btnHandler}
                    index={index + indexOfFirstItem}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {data?.result[0]?.map((item) => (
              <MobileTransactionItem
                key={item.id}
                transaction={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRowClick={btnHandler}
              />
            ))}
          </div>
        </>
      )}
      {/* Modals */}
      {selectedTransaction && (
        <EditTransactionModal
          transaction={selectedTransaction}
          onClose={handleCloseModal}
          validate={isToInvalidate}
          onUpdate={handleUpdateTransaction}
        />
      )}
      {transactionToDelete && (
        <DeleteTransactionModal
          transaction={transactionToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Transaction_List;
