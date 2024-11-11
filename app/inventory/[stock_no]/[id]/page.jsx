"use client";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
export default function SearchBar({ params }) {
  const { token } = useInventoryStore();
  const { data } = useFetchData({
    path: `/admin/stock-allocation/${params.id}`,
    token: token,
    key: "stock-allocation",
  });

  return (
    <div className="overflow-x-auto min-h-52 p-5 bg-white space-y-20">
      <div className="mt-4 p-4  border-l-4 border-yellow-500 text-yellow-800">
        <strong>Note:</strong> This page displays the detailed distribution of
        the selected stock item, including all past transactions, changes in
        quantity, and other relevant updates.
      </div>

      <div className="overflow-auto">
        <table className="table table-xs text-base text-center  rounded-none">
          <thead>
            <tr>
              <th className="p-4 border-l"></th>
              <th className="p-4 border-l">Item</th>
              <th className="p-4 border-l">Department</th>
              <th className="p-4 border-l">Allocated Quantity</th>
              <th className="p-4 border-l">Price</th>
              <th className="p-4 border-l">Total Price</th>
              <th className="p-4 border-l">P.O</th>
              <th className="p-4 border-l">Date</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.result &&
              data.result?.length > 0 &&
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
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
