import { useEffect, useState } from "react";
import axios from "axios";

type StockType = {
  id: string;
  name: string;
  created_At: string;
  updated_at: string;
};

const StockTypeSelect = () => {
  const [stockTypes, setStockTypes] = useState<StockType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockTypes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/get-stock-type`
        );
        setStockTypes(response.data.date); // Adjust according to the response structure
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch stock types");
        setLoading(false);
      }
    };

    fetchStockTypes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <select
      className="select select-bordered w-full max-w-xs"
      defaultValue=""
      name="stockType"
    >
      <option value="" disabled>
        Select Stock Type
      </option>
      {stockTypes.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default StockTypeSelect;
