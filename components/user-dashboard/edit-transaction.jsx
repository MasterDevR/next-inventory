import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useInventoryStore from "@/components/store/store";
import PropTypes from "prop-types";
import axios from "axios";

import { useQueryClient } from "@tanstack/react-query";

const EditTransactionModal = ({
  transaction = {},
  onClose,
  onUpdate,
  validate,
}) => {
  const queryClient = useQueryClient();
  const [isToInvalidate, setIsToInvalidate] = useState(false);
  const { updateModalMessage, updateSuccessModal, updateStatuss, token } =
    useInventoryStore();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionItems, setTransactionItems] = useState(
    transaction.transaction_item
  );

  const { id, transaction_item = [], created_at } = transaction;

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = transactionItems.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: Math.max(0, newQuantity) };
      }
      return item;
    });
    setTransactionItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = transactionItems.filter((_, i) => i !== index);
    setTransactionItems(updatedItems);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/modify-transactions/${id}`,
        { items: transactionItems },
        {
          headers: {
            "Content-Type": "application/json",
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
      console.error("Error updating transaction:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isToInvalidate === true) {
      queryClient.invalidateQueries({ queryKey: ["transaction-history"] });
    }
  }, [isToInvalidate]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center bg-custom-bg-2 text-white p-2">
          Edit Transaction
        </h2>
        <div className="mb-4">
          <p>
            <strong>Transaction ID:</strong> {id}
          </p>

          <p>
            <strong>Date Requested:</strong>{" "}
            {new Date(created_at).toLocaleString()}
          </p>
          <p>
            <strong>Date Updated:</strong>{" "}
            {new Date(created_at).toLocaleString()}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-center">
            Transaction Items
          </h3>
          {transactionItems.map((item, index) => (
            <div key={index} className="flex items-center mb-2 border-b pb-2">
              <div className="flex-grow">
                <p>
                  <strong>Item:</strong> {item?.stock?.description || "N/A"}
                </p>
                <p>
                  <strong>Stock No:</strong> {item.stock_no || "N/A"}
                </p>
                <p>
                  <strong>Measurement:</strong>{" "}
                  {item.stock?.measurement || "N/A"}
                </p>
              </div>
              <input
                type="number"
                value={item.quantity || 0}
                onChange={(e) =>
                  handleQuantityChange(index, parseInt(e.target.value) || 0)
                }
                className="w-20 px-2 py-1 border rounded mr-2"
                min="0"
              />
              <button
                onClick={() => handleDeleteItem(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-around ">
          <button
            onClick={onClose}
            className="rounded btn-error btn-outline btn"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

EditTransactionModal.propTypes = {
  transaction: PropTypes.shape({
    result: PropTypes.shape({
      id: PropTypes.string,
      transaction_item: PropTypes.array,
      transaction_purpose: PropTypes.string,
      status: PropTypes.string,
      department_id: PropTypes.string,
      created_at: PropTypes.string,
    }),
  }),
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditTransactionModal;
