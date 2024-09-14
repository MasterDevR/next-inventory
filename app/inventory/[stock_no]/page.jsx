"use client";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import { useRouter } from "next/navigation";
export default function SearchBar({ params }) {
  const router = useRouter();
  const { data } = useFetchData({
    path: `/admin/stock-details/${params.stock_no}`,
    key: "stock-details",
  });
  return (
    <div className="overflow-x-auto min-h-52 p-5 shadow-md">
      <h1 className="text-center text-white lg:text-3xl font-bold mb-10 bg-custom-bg-2 p-3">
        Stock Report
      </h1>
      <table className="table table-xs overflow-hidden ">
        <thead className="">
          <tr className="text-base text-white text-center bg-custom-bg-3  ">
            <th className="p-2 border-l"> </th>
            <th className="p-2 border-l">Item</th>
            <th className="p-2 border-l">Stock Number</th>
            <th className="p-2 border-l">Price</th>
            <th className="p-2 border-l">Measurement</th>
            <th className="p-2 border-l">Description</th>
            <th className="p-2 border-l">Stock Type</th>
            <th className="p-2 border-l">Quantity on hand</th>
            <th className="p-2 border-l">Quantity on issued</th>
            <th className="p-2 border-l">total Quantity</th>
            <th className="p-2 border-l ">Consume Date</th>
            <th className="p-2 border-l">Manufacturer</th>
            <th className="p-2 border-l">Date</th>
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
                <td className="p-2 border-l text-base">{index + 1}</td>
                <td className="p-2 border-l text-sm">{item.stock.item}</td>
                <td className="p-2 border-l text-sm">{item.stock_no}</td>
                <td className="p-2 border-l text-sm">{item.price}</td>
                <td className="p-2 border-l text-sm">
                  {item.stock.measurement}
                </td>
                <td className="p-2 border-l text-sm">
                  {item.stock.description}
                </td>
                <td className="p-2 border-l text-sm">
                  {item.stock.stocktype.name}
                </td>
                <td className="p-2 border-l text-sm">
                  {item.quantity_on_hand}
                </td>
                <td className="p-2 border-l text-sm">{item.quantity_issued}</td>
                <td className="p-2 border-l text-sm">
                  {item.quantity_on_hand + item.quantity_issued}
                </td>
                <td className="p-2 border-l text-sm">
                  {item.stock.consume_date}
                </td>
                <td className="p-2 border-l text-sm">{item.distributor}</td>
                <td className="p-2 border-l text-sm">
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
  );
}
