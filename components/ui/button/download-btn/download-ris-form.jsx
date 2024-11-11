import React from "react";
import { GoDownload } from "react-icons/go";
import XLSX from "xlsx-js-style";

export default function RIS_Download_Btn({ transactionDetails }) {
  const {
    ris,
    created_at,
    department_id,
    TransactionType,
    user,
    transaction_item,
  } = transactionDetails;
  const date = new Date(created_at);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const formattedDate = new Date(created_at).toLocaleDateString();
  const formattedRisCount = String(ris).padStart(3, "0");
  const formattedRisNumber = `${year}-${month}-${formattedRisCount}`;
  const downloadHandler = () => {
    // Upper part of the form with merged cells
    const wsData = [
      [
        {
          v: "REQUISITION AND ISSUE SLIP",
          s: {
            font: { bold: true, sz: 14 },
            alignment: { horizontal: "center", vertical: "center" },
          },
        },
        "",
        "",
        "",
      ],
      [{}, {}, {}, {}, {}, {}], // Empty row for spacing after the title
      [
        {
          v: "LGU: Universidad De Manila",
          s: { alignment: { horizontal: "left" } },
        },
        "",
        "",
        {
          v: "Fund: Other Supplies and Materials Expenses",
          s: { alignment: { horizontal: "left" } },
        },
        "",
        "",
      ],
      [], // Empty row for spacing below LGU
      [], // Empty row for additional spacing below LGU
      [
        "Division: " + (user.department || "N/A"),
        "",
        "",
        "FPP Code: 3323(014)",
        "RC #: AD-005b",
      ],
      [
        "Office: " + (user.department_code || "N/A"),
        "",
        "",
        "RIS No.: " + (formattedRisNumber || "N/A"),
        "Date: " + (formattedDate || "N/A"),
      ],
      [], // Empty row for spacing
      ["Requisition", "", "", "", "Issuance", "", ""], // Header for requisition and issuance columns
      [
        "Stock No.",
        "Unit",
        "Description",
        "Quantity",
        "Quantity",
        "Remarks",
        "",
        "",
      ], // Column headers for data rows
    ];

    // Body data for transaction items
    transaction_item.forEach((item) => {
      // Push item details to wsData
      wsData.push([
        { v: item.stock_no || "N/A" },
        { v: item.stock.measurement || "N/A" },
        { v: item.stock.item || "N/A" }, // Display item name
        { v: item.quantity || 0 }, // Display quantity
        { v: item.approved_quantity || 0 }, // Display approved quantity
        {
          v:
            item.stock.price +
            " / " +
            item.stock.price * item.approved_quantity,
        }, // Display approved quantity

        "", // Placeholder for remarks
        "",
        "",
      ]);

      // Add 10 empty rows for spacing before the distributor
      for (let i = 0; i < 10; i++) {
        wsData.push([{}, {}, {}, {}, {}, {}, {}, {}]); // Empty row for spacing
      }

      // Add the distributor information, ensuring it only uses columns A to F
      wsData.push(["", "", { v: item.stock.distributor || "N/A" }, "", "", ""]); // Add distributor below the description, only using A to F

      // Add an empty row for spacing after the distributor
      wsData.push([""]); // Optional: Add an empty row for better spacing
    });

    // Create the worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Set merges for the title and alignment
    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, // Merge cells from A1 to H1 (title)
      { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } }, // Merge cells from A2 to D2 for "LGU: Universidad De Manila"
      { s: { r: 8, c: 0 }, e: { r: 8, c: 3 } },
      { s: { r: 8, c: 4 }, e: { r: 8, c: 5 } },
    ];

    // Apply styling for title and merged cells to center text
    const titleCell = "A1";
    ws[titleCell].s = {
      font: { bold: true, sz: 20 },
      alignment: { horizontal: "center", vertical: "center" },
    };

    // Center "Requisition" and "Issuance" merged cells
    ws["A9"].s = {
      font: { bold: true, sz: 16 },

      alignment: { horizontal: "center", vertical: "center" },
    };
    ws["E9"].s = {
      font: { bold: true, sz: 16 },

      alignment: { horizontal: "center", vertical: "center" },
    };

    // Column widths for better formatting
    const colWidths = [];

    // Dynamically adjust column widths based on the longest content in each column
    wsData.forEach((row) => {
      row.forEach((cell, colIndex) => {
        const cellValue = typeof cell === "object" ? cell.v : cell;
        const cellLength = String(cellValue).length;
        if (colWidths[colIndex]) {
          colWidths[colIndex] = Math.max(colWidths[colIndex], cellLength);
        } else {
          colWidths[colIndex] = cellLength;
        }
      });
    });

    // Apply column widths (ensure they fit the content)
    const customWidths = colWidths.map((length) => ({ wch: length + 2 })); // Add a little extra space

    // Merge dynamic widths with custom widths
    ws["!cols"] = customWidths;

    // Create the workbook and download it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RIS");
    XLSX.writeFile(wb, `RIS_${user.department_code}.xlsx`);
  };

  return (
    <button className="btn btn-active cursor-pointer" onClick={downloadHandler}>
      <GoDownload />
      <span className="hidden lg:block">Download</span>
    </button>
  );
}
