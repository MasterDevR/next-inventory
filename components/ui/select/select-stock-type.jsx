"use client";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import Select from "@/components/ui/select/select";
const StockTypeSelect = () => {
  const { theme } = useInventoryStore();
  const { data, isLoading } = useFetchData({
    path: "/admin/get-stock-type",
    key: "stock-type",
  });

  if (isLoading) return <p>Loading...</p>;

  return <Select data={data} title={"Select Stock Type"} />;
};

export default StockTypeSelect;
