"use client";
import XLSX from "xlsx-js-style";
import { GoDownload } from "react-icons/go";
const DownloadStockCardButton = ({ data }) => {
  const handleDownload = () => {
    if (!data || !data.data || data.data.length === 0) {
      alert("No data available to download.");
      return;
    }

    // Extract values from data
    const initialQty = data.initialQty;
    const initialDate = new Date(data.initialDate).toLocaleDateString();
    const stockData = data.data[0].stock; // Assuming stock information is in the first item
    const transactionItems = data.data[0].transaction_item; // Get transaction items

    // Prepare data for Excel
    const wsData = [
      [],
      [],
      [],
      [
        {
          v: "Universidad De Manila",
          s: {
            font: { bold: true, sz: 14 },
            alignment: { horizontal: "center", vertical: "center" },
          },
        },
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        {
          v: "Stock Card",
          s: {
            font: { bold: true, sz: 14 },
            alignment: { horizontal: "center", vertical: "center" },
          },
        },
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        {
          v: "Office: Universidad De Manila",
        },
        "",
        "",
        "",
        "",
        {
          v: "Fund: Other Supplies",
        },
        "",
      ],
      [
        {
          v: `Item: ${stockData.item} `,
          s: { alignment: { horizontal: "left" } },
        },
        "",
        "",
        "",
        "",
        {
          v: `Stock No.: ${stockData.stock_no} `,
          s: { alignment: { horizontal: "left" } },
        },
        "",
      ],
      [
        {
          v: `Description: ${stockData.description} `,
          s: { alignment: { horizontal: "left" } },
        },
        "",
        "",
        "",
        "",
        {
          v: `Re-order-point: ${stockData.stock_no} `,
          s: { alignment: { horizontal: "left" } },
        },
        "",
      ],
      [
        {
          v: `Unit of Measurement: ${stockData.measurement} `,
          s: { alignment: { horizontal: "left" } },
        },
      ],
      [
        {
          v: "Date",
          s: { alignment: { horizontal: "center", vertical: "center" } },
        },
        {
          v: "Reference",
          s: { alignment: { horizontal: "center", vertical: "center" } },
        },
        {
          v: "Receipt",
          s: { alignment: { horizontal: "center", vertical: "center" } },
        },
        {
          v: "Issue",
          s: { alignment: { horizontal: "center", vertical: "center" } },
        },
        {},

        {
          v: "Balance",
          s: { alignment: { horizontal: "center", vertical: "center" } },
        },
        {
          v: "No. of Days to Consume",
          s: {
            alignment: { horizontal: "center", vertical: "center" },
          },
        },
      ],

      [
        "", // Empty cell for Date
        "", // Empty cell for Reference
        { v: "Qty", s: { alignment: { horizontal: "center" } } }, // Qty under Receipt
        { v: "Qty", s: { alignment: { horizontal: "center" } } }, // Qty under Issue
        { v: "Office", s: { alignment: { horizontal: "center" } } }, // Office under Issue
        { v: "Qty", s: { alignment: { horizontal: "center" } } }, // Qty under Balance
      ],
      [
        { v: initialDate, s: { alignment: { horizontal: "center" } } }, // Display initial date
        "", // Empty cell for Reference
        "", // Empty cell for Receipt
        "", // Empty cell for Issue"", // Empty cell for Receipt
        "", // Empty cell for Issue
        { v: initialQty, s: { alignment: { horizontal: "center" } } }, // Display initial quantity as balance
        "", // Empty cell for No. of Days to Consume
      ],
    ];

    // Add transaction items to wsData
    transactionItems.forEach((item) => {
      wsData.push([
        {
          v: new Date(item.created_at).toLocaleDateString(),
          s: { alignment: { horizontal: "center" } },
        }, // Date
        { v: item.ris, s: { alignment: { horizontal: "center" } } }, // Reference
        { v: item.stock_no, s: { alignment: { horizontal: "center" } } }, // Receipt
        { v: item.quantity, s: { alignment: { horizontal: "center" } } }, // Issue (Qty)
        { v: item.office, s: { alignment: { horizontal: "center" } } }, // Issue (Qty)
        { v: item.balance, s: { alignment: { horizontal: "center" } } }, // Balance
        {
          v: stockData.consume_date,
          s: { alignment: { horizontal: "center" } },
        }, // No. of Days to Consume (empty for now)
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Define maximum widths for each column
    const maxWidths = [15, null, null, null, 15, 15, 20]; // Set a fixed width for "No. of Days to Consume"

    // Calculate column widths based on the content for other columns
    const colWidths = maxWidths.map((maxWidth, index) => {
      if (maxWidth === null) {
        // Calculate max length for the specific columns
        let maxLength = 0;
        wsData.forEach((row) => {
          const cellValue =
            typeof row[index] === "object" ? row[index].v : row[index];
          const cellLength = String(cellValue).length;
          maxLength = Math.max(maxLength, cellLength);
        });
        return { wch: maxLength + 2 }; // Add a little extra space for padding
      }
      return { wch: maxWidth }; // Use the defined max width for other columns
    });

    // Set the column widths in the worksheet
    ws["!cols"] = colWidths;

    ws["!merges"] = [
      { s: { r: 3, c: 0 }, e: { r: 3, c: 6 } },
      { s: { r: 4, c: 0 }, e: { r: 4, c: 6 } },
      { s: { r: 5, c: 0 }, e: { r: 5, c: 4 } },
      { s: { r: 5, c: 5 }, e: { r: 5, c: 6 } },
      { s: { r: 6, c: 0 }, e: { r: 6, c: 4 } },
      { s: { r: 6, c: 5 }, e: { r: 6, c: 6 } },
      { s: { r: 7, c: 0 }, e: { r: 7, c: 4 } },
      { s: { r: 7, c: 5 }, e: { r: 7, c: 6 } },
      { s: { r: 8, c: 0 }, e: { r: 8, c: 6 } },
      { s: { r: 9, c: 0 }, e: { r: 10, c: 0 } },
      { s: { r: 9, c: 1 }, e: { r: 10, c: 1 } },
      { s: { r: 9, c: 3 }, e: { r: 9, c: 4 } },
      { s: { r: 9, c: 6 }, e: { r: 10, c: 6 } },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stock Card");
    XLSX.writeFile(
      wb,
      `Stock_Card_${stockData.item}_${stockData.stock_no}.xlsx`
    );
  };

  return (
    <button onClick={handleDownload} className="btn btn-outline">
      <GoDownload />
      Download
    </button>
  );
};

export default DownloadStockCardButton;
