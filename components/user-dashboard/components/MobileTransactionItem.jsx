import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getStatusColor, renderActions } from "../utils/transactionHelpers";

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

export default MobileTransactionItem;
