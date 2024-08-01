"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface Item {
  id: string;
  item: string;
  price: number;
  description: string;
  measurement: string;
  stock_no: string;
  re_order_point: string;
  quantity: number;
  image: string;
  reference: string;
  consume_date: number;
  distributor: string;
}

const fetchItemList = async (): Promise<Item[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/get-item`
    );
    return response.data.item;
  } catch (error) {
    return [];
  }
};

const InventoryTable: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { data, isError, error, isLoading } = useQuery<Item[] | undefined>({
    queryKey: ["items"],
    queryFn: fetchItemList,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleButtonClick = (itemData: Item) => {
    setSelectedItemId(selectedItemId === itemData.id ? null : itemData.id);
  };

  const deleteHandler = async (id: String) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/delete-item/${id}`)
      .then((res) => {
        return res.data.status;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Measurement</th>
            <th>Description</th>
            <th>Stock Number</th>
            <th>Re-Order Point</th>
            <th>Reference</th>
            <th>Consume Date</th>
            <th>Manufacturer</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.item}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.measurement}</td>
              <td>{item.description}</td>
              <td>{item.stock_no}</td>
              <td>{item.re_order_point}</td>
              <td>{item.reference}</td>
              <td>{item.consume_date}</td>
              <td>{item.distributor}</td>
              <td>
                <Image
                  src={item.image}
                  height={50}
                  width={50}
                  alt={item.item}
                />
              </td>
              <td className="relative">
                {/* Toggle action div */}
                <div
                  className={`absolute z-10 p-2 w-32 bg-white rounded-md shadow-lg flex flex-col justify-center items-center gap-y-3 text-white ${
                    selectedItemId === item.id ? "block" : "hidden"
                  }`}
                  style={{
                    bottom: "100%", // Position above the row
                    left: 0,
                    transform: "translateY(4rem) translateX(-8rem)", // Adjust if needed
                  }}
                >
                  <button className="w-4/6 bg-green-500 p-2 rounded-md hover:bg-green-600">
                    Edit
                  </button>
                  <button
                    className="w-4/6 bg-red-500 p-2  rounded-md hover:bg-red-600"
                    onClick={() => deleteHandler(item.id)}
                  >
                    Delete
                  </button>
                </div>
                {/* Button to toggle action */}
                <button
                  onClick={() => handleButtonClick(item)}
                  className="font-bold text-center w-full text-lg"
                >
                  ...
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
