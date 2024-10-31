import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useInventoryStore from "@/components/store/store";

const EditTransactionModal = ({ transaction, onClose, onUpdate }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useInventoryStore();

  useEffect(() => {
    if (transaction && transaction.transaction_item) {
      setItems(transaction.transaction_item || []);
    }
    console.log(transaction);
  }, [transaction]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = Math.max(0, newQuantity);
    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/${process.env.NEXT_PUBLIC_BASE_URL}/user/modify-transactions/${transaction.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items }),
        }
      );

      if (response.ok) {
        onUpdate();
        onClose();
      } else {
        throw new Error("Failed to update transaction");
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center bg-custom-bg-2 text-white p-2">
          Edit Transaction
        </h2>
        <div className="mb-4">
          <p>
            <strong>Transaction ID:</strong> {transaction.id}
          </p>
          <p>
            <strong>Purpose:</strong> {transaction.TransactionType.name}
          </p>
          <p>
            <strong>Status:</strong> {transaction.Status.name}
          </p>
          <p>
            <strong>Department ID:</strong> {transaction.department_id}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(transaction.created_at).toLocaleString()}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Items</h3>
          {items.map((item, index) => (
            <div key={index} className="flex items-center mb-2 border-b pb-2">
              <div className="flex-grow">
                <p>
                  <strong>Item:</strong> {item.stock?.item || "N/A"}
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
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(index, parseInt(e.target.value))
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

export default EditTransactionModal;
