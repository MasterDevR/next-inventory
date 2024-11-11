"use client";
import useInventoryStore from "@/components/store/store";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import { useRouter } from "next/navigation";

export default function SearchBar({ params }) {
  const { token } = useInventoryStore();
  const router = useRouter();
  const { data } = useFetchData({
    path: `/admin/stock-details/${params.stock_no}`,
    token: token,
    key: "stock-details",
  });

  return (
    <div
      className="overflow-x-auto min-h-52 shadow-md bg-white space-y-20
 p-4"
    >
      {/* Note Section */}
      <div className="mt-4 p-4  border-l-4 border-yellow-500 text-yellow-800">
        <strong>Note:</strong> This page displays the detailed history of the
        selected stock item, including all past transactions, changes in
        quantity, and other relevant updates.
      </div>

      <div className="overflow-auto">
        {/* Responsive Table */}
        <div className="hidden lg:block">
          <table className="table table-x rounded-none">
            <thead>
              <tr>
                <th> </th>
                <th>Stock No.</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Description</th>
                <th>Stock Type</th>
                <th>Qty on hand</th>
                <th>Qty issued</th>
                <th>Total Qty</th>
                <th>Consume Date</th>
                <th>Distributor</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data && data.result && data.result.length > 0 ? (
                data.result.map((item, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer hover:bg-gray-200 text-center"
                    onClick={() => {
                      router.push(`/inventory/${item.stock_no}/${item.id}`);
                    }}
                  >
                    <td>{index + 1}</td>
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

        {/* Card Layout for Smaller Viewports */}
        <div className="lg:hidden grid grid-cols-1 gap-4">
          {data && data.result && data.result.length > 0 ? (
            data.result.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-md  cursor-pointer hover:shadow-lg"
                onClick={() => {
                  router.push(`/inventory/${item.stock_no}/${item.id}`);
                }}
              >
                <h2 className="font-bold">{item.stock.item}</h2>
                <p>
                  <strong>Stock Number:</strong> {item.stock_no}
                </p>
                <p>
                  <strong>Price:</strong> {item.price}
                </p>
                <p>
                  <strong>Measurement:</strong> {item.stock.measurement}
                </p>
                <p>
                  <strong>Description:</strong> {item.stock.description}
                </p>
                <p>
                  <strong>Stock Type:</strong> {item.stock.stocktype.name}
                </p>
                <p>
                  <strong>Quantity on Hand:</strong> {item.quantity_on_hand}
                </p>
                <p>
                  <strong>Quantity Issued:</strong> {item.quantity_issued}
                </p>
                <p>
                  <strong>Total Quantity:</strong>{" "}
                  {item.quantity_on_hand + item.quantity_issued}
                </p>
                <p>
                  <strong>Consume Date:</strong> {item.stock.consume_date}
                </p>
                <p>
                  <strong>Manufacturer:</strong> {item.distributor}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(item.created_at).toISOString().slice(0, 10)}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center font-bold text-lg">No Data Found</div>
          )}
        </div>
      </div>
    </div>
  );
}
