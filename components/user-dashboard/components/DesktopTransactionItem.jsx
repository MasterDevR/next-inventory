import { FaEdit, FaTrash } from "react-icons/fa";
import { getStatusColor, renderActions } from "../utils/transactionHelpers";

const DesktopTransactionItem = ({
  transaction,
  index,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  return (
    <tr
      className="text-center cursor-pointer hover:bg-gray-300 transition duration-200 ease-in-out border-b border-gray-200"
      onClick={() => onRowClick(transaction.id)}
    >
      <td className="p-2 border border-gray-300">{index + 1}</td>
      <td className="p-2 border border-gray-300">
        {transaction.TransactionType.name}
      </td>
      <td className={`p-4 ${getStatusColor(transaction.Status.name)}`}>
        {transaction.Status.name}
      </td>
      <td className="p-2 border border-gray-300">
        {new Date(transaction.created_at).toISOString().slice(0, 10)}
      </td>
      <td
        className="p-2 border border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        {renderActions(transaction, onEdit, onDelete)}
      </td>
    </tr>
  );
};

export default DesktopTransactionItem;
