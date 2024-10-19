import React, { Fragment, useMemo } from "react";

const Header = ({ data }) => {
  const currentDate = new Date();
  const Year = currentDate.getFullYear();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const day = currentDate.getDate();

  const totalColumns = data?.purchaseNo?.length * 3 + 5;
  const blankColumnsCount = totalColumns - 2;

  const grandTotalCost = useMemo(() => {
    return (
      data?.groupedData?.reduce((acc, item) => {
        const totalCost = item.price.reduce((subAcc, price, idx) => {
          const quantityIssued = item.quantity_issued[idx] || 0;
          return subAcc + price * quantityIssued;
        }, 0);
        return acc + totalCost;
      }, 0) || 0
    );
  }, [data]);

  return (
    <Fragment>
      <tr>
        <th
          className="flex-1 border-black border w-full text-center bg-transparent text-black"
          colSpan={data && data.status === 404 ? 8 : totalColumns}
        >
          CITY GENERAL SERVICES OFFICE
        </th>
      </tr>
      <tr>
        <th
          className="flex-1 border-black border w-full text-center bg-transparent text-black"
          colSpan={data && data.status === 404 ? 8 : totalColumns}
        >
          SUMMARY OF SUPPLIES AND MATERIALS ISSUANCE SLIP
        </th>
      </tr>
      <tr>
        <th
          className="flex-1 border-black border w-full text-center bg-transparent text-black"
          colSpan={data && data.status === 404 ? 8 : totalColumns}
        >
          UNIVERSIDAD DE MANILA As of {month} {day}, {Year}
        </th>
      </tr>
      <tr>
        {Array.from({
          length: data && data.status === 404 ? 6 : blankColumnsCount,
        }).map((_, idx) => (
          <th key={idx} className="border border-black bg-transparent" />
        ))}
        <th className="text-end border border-black bg-transparent text-black">
          Total Cost:
        </th>
        <th className="text-end border border-black bg-transparent text-black">
          {grandTotalCost.toFixed(2)}
        </th>
      </tr>
    </Fragment>
  );
};

export default Header;
