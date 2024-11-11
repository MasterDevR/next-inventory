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

  const formatGrandTotal = (total) => {
    return total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formattedGrandTotal = formatGrandTotal(grandTotalCost);

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
        <th
          className="border border-black bg-transparent"
          colSpan={blankColumnsCount - 2}
        />
        <th
          className="text-end border border-black bg-transparent text-black"
          colSpan={2}
        >
          Total Cost:
        </th>
        <th
          className="text-end border border-black bg-transparent text-black"
          colSpan={2}
        >
          {formattedGrandTotal}
        </th>
      </tr>
    </Fragment>
  );
};

export default Header;
