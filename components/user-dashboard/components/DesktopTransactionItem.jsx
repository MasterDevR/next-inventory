import { FaEdit, FaTrash } from "react-icons/fa";
import { getStatusColor, renderActions } from "../utils/transactionHelpers";

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

export default DesktopTransactionItem;
