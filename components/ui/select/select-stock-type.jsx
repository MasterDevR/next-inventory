"use client";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import Select from "@/components/ui/select/select";
const StockTypeSelect = ({ onChange }) => {
  const { token } = useInventoryStore();
  const { data, isLoading } = useFetchData({
    path: "/admin/get-stock-type",
    token: token,
    key: "stock-type",
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <Select
      data={data && data.type}
      title={"Select Stock Type"}
      onChange={onChange}
    />
  );
};

export default StockTypeSelect;
