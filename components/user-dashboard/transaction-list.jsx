"use client";
import React, { useState } from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import EditTransactionModal from "./edit-transaction";
import DeleteTransactionModal from "./delete-transaction";

const DesktopTransactionItem = ({
  transaction,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  return (
    <tr
      className="text-center cursor-pointer hover:bg-gray-200"
      onClick={() => onRowClick(transaction.id)}
    >
      <td>{transaction.id}</td>
      <td>{transaction.TransactionType.name}</td>
      <td className={`p-3 ${getStatusColor(transaction.Status.name)}`}>
        {transaction.Status.name}
      </td>
      <td>{new Date(transaction.created_at).toISOString().slice(0, 10)}</td>
      <td onClick={(e) => e.stopPropagation()}>
        {renderActions(transaction, onEdit, onDelete)}
      </td>
    </tr>
  );
};

const MobileTransactionItem = ({
  transaction,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4 bg-white p-4 rounded-xl shadow-lg">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <div>
          <p className="font-bold">{transaction.TransactionType.name}</p>
          <p className={`text-sm ${getStatusColor(transaction.Status.name)}`}>
            {transaction.Status.name}
          </p>
        </div>
        <div>{isExpanded ? <FaChevronUp /> : <FaChevronDown />}</div>
      </div>
      {isExpanded && (
        <div className="mt-2">
          <p>
            <strong>ID:</strong> {transaction.id}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(transaction.created_at).toISOString().slice(0, 10)}
          </p>
          <div className="mt-2 flex justify-between items-center">
            <div>{renderActions(transaction, onEdit, onDelete)}</div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onRowClick(transaction.id)}
            >
              View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "text-green-500";
    case "ready":
      return "text-blue-500";
    case "pending":
      return "text-violet-500";
    default:
      return "text-red-500";
  }
};

const renderActions = (transaction, onEdit, onDelete) => {
  if (transaction.Status.name.toLowerCase() === "pending") {
    return (
      <>
        <button
          className="btn btn-ghost btn-xs mr-2"
          onClick={(e) => onEdit(e, transaction)}
        >
          <FaEdit size={"1rem"} />
        </button>
        <button
          className="btn btn-ghost btn-xs text-red-500"
          onClick={(e) => onDelete(e, transaction)}
        >
          <FaTrash size={"1rem"} />
        </button>
      </>
    );
  }
  return null;
};

const Transaction_List = () => {
  const { department_id, token } = useInventoryStore();
  const router = useRouter();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const { data, mutate } = useFetchData({
    path: `/user/get-transaction-history/${department_id}/undefined`,
    token: token,
    key: "transaction-history",
  });

  const btnHandler = (id) => {
    router.push(`/transaction/${id}`);
  };

  const handleEdit = (e, item) => {
    e.stopPropagation();
    setSelectedTransaction(item);
  };

  const handleDelete = (e, item) => {
    e.stopPropagation();
    setTransactionToDelete(item);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  const handleUpdateTransaction = () => {
    mutate();
    setSelectedTransaction(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `/api/transactions/${transactionToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        mutate();
        setTransactionToDelete(null);
      } else {
        throw new Error("Failed to delete transaction");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleDeleteCancel = () => {
    setTransactionToDelete(null);
  };

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto bg-white min-h-[50vh] shadow-lg rounded-3xl">
        <table className="table w-full">
          <thead className="text-base text-center">
            <tr>
              <th>Transaction ID</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.result[0]?.map((item) => (
                <DesktopTransactionItem
                  key={item.id}
                  transaction={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onRowClick={btnHandler}
                />
              ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {data &&
          data?.result[0]?.map((item) => (
            <MobileTransactionItem
              key={item.id}
              transaction={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRowClick={btnHandler}
            />
          ))}
      </div>

      {selectedTransaction && (
        <EditTransactionModal
          transaction={selectedTransaction}
          onClose={handleCloseModal}
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
    </div>
  );
};

export default Transaction_List;
