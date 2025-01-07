"use client";
import useInventoryStore from "@/components/store/store";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import { useRouter } from "next/navigation";
import { LuArrowLeft, LuX, LuAlertCircle } from "react-icons/lu";

export default function TransactionDetails({ params }) {
  const { department_id, token, role } = useInventoryStore();
  const router = useRouter();
  const { data, isLoading, error } = useFetchData({
    path: `/user/get-transaction-history/${department_id}/${params.id}`,
    token: token,
    key: "transaction-history-id",
  });
  const [currentStatus, setCurrentStatus] = useState("");
  const [showRejectedMessage, setShowRejectedMessage] = useState(true);

  useEffect(() => {
    if (role && role !== "user") {
      return redirect("../../not-found");
    }
  }, [role]);

  useEffect(() => {
    if (data?.result[0]?.Status?.name) {
      setCurrentStatus(data.result[0].Status.name);
    }
  }, [data]);

  const steps = [
    { name: "Pending", value: "pending" },
    { name: "Approved", value: "approved" },
    { name: "Ready", value: "ready" },
    { name: "Completed", value: "completed" },
  ];

  const getActiveSteps = () => {
    const statusIndex = steps.findIndex((step) => step.value === currentStatus);
    return steps.map((_, index) => index <= statusIndex);
  };

  const activeSteps = getActiveSteps();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Error loading data" />;
  if (!data?.result?.length) return <NoDataMessage />;

  const transaction = data.result[0];
  const isRejected = transaction.Status.name === "rejected";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <BackButton onClick={() => router.back()} />
        {isRejected && showRejectedMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-md w-full mx-4 text-center animate-fade-in relative">
              <button
                onClick={() => setShowRejectedMessage(false)}
                className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <LuX className="w-5 h-5 text-gray-500" />
              </button>
              <div className="text-red-500 mb-4">
                <LuAlertCircle className="w-14 h-14 sm:w-16 sm:h-16 mx-auto" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                Transaction Rejected
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                {`We're sorry, but this transaction request has been rejected.
                Please review the requirements and submit a new request if
                needed.`}
              </p>
              <button
                onClick={() => router.back()}
                className="btn btn-error w-full sm:w-auto"
              >
                Return to Transactions
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <TransactionStatus steps={steps} activeSteps={getActiveSteps()} />
        </div>

        <TransactionInfo transaction={transaction} />
      </div>
    </div>
  );
}

const BackButton = ({ onClick }) => (
  <button
    className="btn btn-error btn-outline flex items-center gap-2 text-sm sm:text-base"
    onClick={onClick}
  >
    <LuArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
    <span>Back</span>
  </button>
);

const TransactionStatus = ({ steps, activeSteps }) => (
  <div className="w-full overflow-x-auto pb-2">
    <ul className="steps steps-horizontal min-w-full">
      {steps.map((step, index) => (
        <li
          key={step.value}
          className={`step ${
            activeSteps[index] ? "step-primary" : ""
          } text-xs sm:text-sm`}
        >
          {step.name}
        </li>
      ))}
    </ul>
  </div>
);

const TransactionInfo = ({ transaction }) => (
  <div className="bg-white rounded-xl shadow-sm">
    <div className="p-4 sm:p-6 space-y-6">
      {transaction.Status.name === "approved" && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md">
          <p className="font-bold">Transaction Approved</p>
          <p>Please wait for the item to be ready for pickup.</p>
        </div>
      )}
      {transaction.Status.name === "ready" && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded-md">
          <p className="font-bold">Transaction Ready</p>
          <p>
            {`Your request has been completed. You can now pick up your item at the Supply and Equipment Department of the University de Manila.`}
          </p>
        </div>
      )}
      {transaction.Status.name === "completed" && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-md">
          <p className="font-bold">Transaction Completed</p>
          <p>Your transaction has been successfully completed.</p>
        </div>
      )}
      {transaction.Status.name === "rejected" && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md">
          <p className="font-bold">Transaction Rejected</p>
          <p>Your transaction has been rejected.</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-custom-bg-2 text-white">
              <th className="hidden sm:table-cell w-16">#</th>
              <th>Item</th>
              <th className="hidden md:table-cell">Stock No.</th>
              <th className="w-24">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {transaction.transaction_item?.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="hidden sm:table-cell text-gray-500">
                  {index + 1}
                </td>
                <td className="font-medium">{item.stock.description}</td>
                <td className="hidden md:table-cell text-gray-600">
                  {item.stock_no}
                </td>
                <td className="text-right">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="min-h-screen flex justify-center items-center bg-gray-50">
    <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="min-h-screen flex justify-center items-center bg-gray-50">
    <div className="text-center p-4">
      <LuAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <div className="text-lg sm:text-xl font-semibold text-red-500">
        {message}
      </div>
    </div>
  </div>
);

const NoDataMessage = () => (
  <div className="min-h-screen flex justify-center items-center bg-gray-50">
    <div className="text-center p-4">
      <div className="text-lg sm:text-xl font-medium text-gray-500">
        No data available
      </div>
    </div>
  </div>
);
