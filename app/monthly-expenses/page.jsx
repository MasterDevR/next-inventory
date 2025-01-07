"use client";
import React, { useState, useEffect } from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import Loading_component from "@/components/monthly-expenses/loading";
import Error_component from "@/components/monthly-expenses/error";
import MonthlyExpensesTable from "@/components/monthly-expenses/monthly-expenses-table";
import { useQueryClient } from "@tanstack/react-query";

const Page = () => {
  const { token } = useInventoryStore();
  const queryClient = useQueryClient();

  // get current year
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data, isLoading, error } = useFetchData({
    path: `/admin/get-monthly-expenses/${year}`,
    token,
    key: "monthly-expenses",
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["monthly-expenses"] });
  }, [year, queryClient]);

  return (
    <div className="p-2 bg-white">
      {isLoading ? (
        <Loading_component />
      ) : error ? (
        <Error_component />
      ) : (
        <MonthlyExpensesTable data={data} setYear={setYear} />
      )}
    </div>
  );
};
export default Page;
