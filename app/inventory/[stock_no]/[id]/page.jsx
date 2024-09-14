"use client";
import useFetchData from "@/components/util/custom-hook/useFetchData";

export default function SearchBar({ params }) {
  const { data } = useFetchData({
    path: `/admin/stock-allocation/${params.id}`,
    key: "stock-allocation",
  });

  return (
    <div className="overflow-x-auto min-h-52 p-5 shadow-md">
      <h1 className="text-center text-white lg:text-3xl font-bold mb-10 bg-custom-bg-2 p-3">
        Stock Allocation
      </h1>
      <table className="table table-xs overflow-hidden">
        <thead className="">
          <tr className="text-base text-white text-center bg-custom-bg-3">
            <th className="p-2 border-l"></th>
            <th className="p-2 border-l">Item</th>
            <th className="p-2 border-l">Department</th>
            <th className="p-2 border-l">Allocated Quantity</th>
            <th className="p-2 border-l">Price</th>
            <th className="p-2 border-l">Total Price</th>
            <th className="p-2 border-l">P.O</th>
            <th className="p-2 border-l">Date</th>
          </tr>
        </thead>
        <tbody>
          {data && data.result && data.result?.length > 0 ? (
            data.result?.map((item, index) =>
              item.transaction_item?.map((transaction, i) => (
                <tr key={index + item.id} className="text-center">
                  <td className="p-2 border-l text-sm">{i + 1}</td>
                  <td className="p-2 border-l text-sm">{item.stock.item}</td>
                  <td className="p-2 border-l text-sm">
                    {transaction.Transaction.user.department_code}
                  </td>
                  <td className="p-2 border-l text-sm">
                    {transaction.approved_quantity}
                  </td>
                  <td className="p-2 border-l text-sm">{item.price}</td>
                  <td className="p-2 border-l text-sm">
                    {item.price * transaction.approved_quantity}
                  </td>
                  <td className="p-2 border-l text-sm">
                    {item.purchase_order}
                  </td>
                  <td className="p-2 border-l text-sm">
                    {new Date(transaction.created_at)
                      .toISOString()
                      .slice(0, 10)}
                  </td>
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan={6} className="text-center font-bold text-lg">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
