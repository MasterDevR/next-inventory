"use client";
import useInventoryStore from "@/components/store/store";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
export default function SearchBar({ params }) {
  const { department_id, token, role } = useInventoryStore();
  const router = useRouter();
  const { data, isLoading, error } = useFetchData({
    path: `/user/get-transaction-history/${department_id}/${params.id}`,
    token: token,
    key: "transaction-history-id",
  });

  const [currentStatus, setCurrentStatus] = useState("");

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
  ];

  const getActiveSteps = () => {
    const statusIndex = steps.findIndex((step) => step.value === currentStatus);
    return steps.map((_, index) => index <= statusIndex);
  };

  const activeSteps = getActiveSteps();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data?.result.length) return <div>No data available</div>;

  const transaction = data.result[0];

  console.log(data);
  return (
    <div className="container m-auto space-y-10">
      <button
        className="btn btn-error btn-outline"
        onClick={() => {
          router.back();
        }}
      >
        <LuArrowLeft color="red" size={"1rem"} />
        <span className="hidden lg:block">Back</span>
      </button>
      <ul className="steps w-full">
        {steps.map((step, index) => (
          <li
            key={step.value}
            className={`step ${activeSteps[index] ? "step-primary" : ""}`}
          >
            {step.name}
          </li>
        ))}
      </ul>
      <div className="transaction-details text-center">
        <p>
          <strong>Purpose:</strong> {transaction.TransactionType.name}
        </p>

        <div className="w-full m-auto">
          <details className="collapse collapse-arrow">
            <summary className="collapse-title text-base">
              <span>Details</span>
            </summary>
            <table key={transaction.id} className="table">
              <thead>
                <tr className="text-base bg-custom-bg-2 text-white text-center">
                  <th></th>
                  <th>Item</th>
                  <th>Stock No.</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {transaction.transaction_item?.map((item, index) => (
                  <tr key={item.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.stock.description}</td>
                    <td>{item.stock_no}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>
      </div>
    </div>
  );
}
