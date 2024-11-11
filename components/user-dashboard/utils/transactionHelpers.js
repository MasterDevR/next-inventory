import { FaEdit, FaTrash } from "react-icons/fa";

export const getStatusColor = (status) => {
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

export const renderActions = (transaction, onEdit, onDelete) => {
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
