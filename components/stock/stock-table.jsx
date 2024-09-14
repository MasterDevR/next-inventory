"use client";
import React, { Fragment, useEffect, useState } from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import Image from "next/image";
import DeleteStockBtn from "@/components/ui/button/delete-stock-btn";
import EditBtn from "@/components/ui/button/edit-item-btn";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
const InventoryTable = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [searchItem, setSearchItem] = useState(undefined);
  const { data, isLoading } = useFetchData({
    path: `/admin/get-stock/${searchItem}`,
    key: "stock",
  });

  useEffect(() => {
    queryClient.invalidateQueries(["stock"]);
  }, [searchItem]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const handleButtonClick = (event, itemData) => {
    event.stopPropagation();
    setSelectedItemId(selectedItemId === itemData.id ? null : itemData.id);
  };
  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSearchItem(undefined);
    } else {
      setSearchItem(value);
    }
  };

  return (
    <Fragment>
      <header className="mb-10 h-10 w-96 relative">
        <input
          type="text"
          placeholder="Search Item"
          onChange={(e) => handleChange(e)}
          className="border border-gray-400 rounded-full pl-10 w-full h-full"
        />
      </header>
      <div className="overflow-x-auto min-h-52">
        <table className="table table-xs overflow-hidden ">
          <thead className="">
            <tr className={`text-lg `}>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Measurement</th>
              <th>Description</th>
              <th>Stock Number</th>
              <th>Stock Type</th>
              {/* <th>Re-Order Point</th> */}
              {/* <th>Reference</th> */}
              <th>Consume Date</th>
              <th>Manufacturer</th>
              <th>Image</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data && data.item && data?.item.length > 0 ? (
              data.item.map((item, index) => (
                <tr
                  key={index}
                  className=" cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    router.push(`/inventory/${item.stock_no}`);
                  }}
                >
                  <td>{item.item}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity_on_hand}</td>
                  <td>{item.measurement}</td>
                  <td className="w-56">{item.description}</td>
                  <td>{item.stock_no}</td>
                  <td>{item.stocktype.name}</td>
                  {/* <td>{item.re_order_point}</td> */}
                  {/* <td>{item.reference}</td> */}
                  <td>{item.consume_date}</td>
                  <td>{item.distributor}</td>
                  <td>
                    {item.image && (
                      <Image
                        src={item.image}
                        height={50}
                        width={50}
                        placeholder="blur"
                        sizes="auto"
                        blurDataURL={item.image}
                        alt={item.item}
                        priority
                      />
                    )}
                  </td>
                  <td className="relative">
                    {selectedItemId === item.id && (
                      <div
                        className={`absolute z-10 p-2 w-32 bg-white rounded-md shadow-lg flex flex-col justify-center items-center gap-y-3 text-white ${
                          selectedItemId === item.id ? "block" : "hidden"
                        }`}
                        style={{
                          bottom: "100%",
                          left: 0,
                          transform: "translateY(4rem) translateX(-8rem)",
                        }}
                      >
                        <EditBtn stock_no={item.stock_no} />
                        <DeleteStockBtn stock_no={item.stock_no} id={item.id} />
                      </div>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={(event) => handleButtonClick(event, item)}
                      className="font-bold text-center w-full text-lg"
                    >
                      ...
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center font-bold text-lg">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {data && data.length <= 0 && (
          <div className="h-52 flex items-center justify-center">
            <h1 className="text-center text-lg ">No Data Found</h1>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default InventoryTable;
