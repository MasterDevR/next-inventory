import React, { Fragment, useMemo } from "react";

// calculate if leap year and return the last date of the month

// how to pass
const monthEndDates = {
  January: 31,
  February: (year) =>
    year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

const Header = ({ data, selectedYear, selectedMonth, monthName }) => {
  const currentDate = new Date();
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
  // if selected month is < current month, then use the last date of the selected month
  const lastDateOfSelectedMonth =
    selectedMonth < currentDate.getMonth() + 1
      ? selectedMonth === 2
        ? monthEndDates.February(selectedYear)
        : monthEndDates[Object.keys(monthEndDates)[selectedMonth - 1]]
      : day;
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
          UNIVERSIDAD DE MANILA As of {monthName} {lastDateOfSelectedMonth},{" "}
          {selectedYear}
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
          {selectedMonth > currentDate.getMonth() + 1 ? 0 : formattedGrandTotal}
        </th>
      </tr>
    </Fragment>
  );
};

export default Header;
