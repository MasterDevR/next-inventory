"use client";
import useInventoryStore from "@/components/store/store";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
export default function SearchBar({ params }) {
  const { token } = useInventoryStore();
  const router = useRouter();
  const { data } = useFetchData({
    path: `/admin/stock-details/${params.stock_no}`,
    token: token,
    key: "stock-details",
  });
  return (
    <div className="overflow-x-auto min-h-52 shadow-md bg-white p-4 ">
      <h1 className="text-center text-white lg:text-3xl font-bold mb-10 bg-custom-bg-2 p-3">
        Stock Report
      </h1>
      <div className="overflow-auto">
        <table className="table table-x rounded-none">
          <thead className="">
            <tr>
              <th> </th>
              <th>Item</th>
              <th>Stock Number</th>
              <th>Price</th>
              <th>Measurement</th>
              <th>Description</th>
              <th>Stock Type</th>
              <th>Quantity on hand</th>
              <th>Quantity on issued</th>
              <th>total Quantity</th>
              <th>Consume Date</th>
              <th>Manufacturer</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data && data.result && data?.result.length > 0 ? (
              data?.result?.map((item, index) => (
                <tr
                  key={index}
                  className=" cursor-pointer hover:bg-gray-200 text-center"
                  onClick={() => {
                    router.push(`/inventory/${item.stock_no}/${item.id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{item.stock.item}</td>
                  <td>{item.stock_no}</td>
                  <td>{item.price}</td>
                  <td>{item.stock.measurement}</td>
                  <td>{item.stock.description}</td>
                  <td>{item.stock.stocktype.name}</td>
                  <td>{item.quantity_on_hand}</td>
                  <td>{item.quantity_issued}</td>
                  <td>{item.quantity_on_hand + item.quantity_issued}</td>
                  <td>{item.stock.consume_date}</td>
                  <td>{item.distributor}</td>
                  <td>
                    {new Date(item.created_at).toISOString().slice(0, 10)}
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
      </div>
    </div>
  );
}
