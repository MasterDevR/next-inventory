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

  const formattedDate = new Date(created_at).toLocaleDateString();

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
        "Division: Universidad De Manila",
        "",
        "",
        "FPP Code: 3323(014)",
        "RC #: AD-005b",
      ],
      [
        "Office: " + (user.department_code || "N/A"),
        "",
        "",
        "RIS No.: " + (ris || "N/A"),
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
    let totalValue = 0; // Initialize total value
    transaction_item.forEach((item) => {
      // Calculate the total value for the current item
      const itemTotalValue = item.stock.price * item.approved_quantity;
      totalValue += itemTotalValue; // Accumulate total value

      // Push item details to wsData
      wsData.push([
        { v: item.stock_no || "N/A" },
        { v: item.stock.measurement || "N/A" },
        { v: item.stock.item || "N/A" }, // Display item name
        { v: item.quantity || 0 }, // Display quantity
        { v: item.approved_quantity || 0 }, // Display approved quantity
        {
          v: itemTotalValue, // Display total value for the item
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

    // After processing all items, add the total row
    wsData.push([
      "", // Empty cell for stock number
      "", // Empty cell for unit
      "", // Empty cell for description
      "", // Empty cell for quantity
      "", // Empty cell for approved quantity
      { v: totalValue }, // Total value for all items
      "", // Placeholder for remarks
      "",
      "",
    ]);

    // Add "Total" label in the appropriate cell
    wsData[wsData.length - 1][3] = { v: "Total" }; // Set "Total" in the Quantity column
    // Add vertical spacing (2 empty rows)
    wsData.push([], []); // Add two empty rows for spacing

    // Add Purpose and other labels
    wsData.push([
      { v: "Purpose" }, // Column 0: Purpose
      "", // Column 1: Empty
      "", // Column 6: Empty
      "", // Column 7: Empty
      "", // Column 8: Empty
      "", // Column 6: Empty
      "", // Column 7: Empty
      "", // Column 8: Empty
    ]);
    wsData.push([
      "",
      "", // Column 1: Empty
      { v: "Requested By" }, // Column 2: Requested By
      { v: "Approved By" }, // Column 3: Approved By
      { v: "Issued By" }, // Column 4: Issued By
      { v: "Received By" }, // Column 5: Received By
      "", // Column 6: Empty
      "", // Column 7: Empty
      "", // Column 8: Empty
    ]);

    // Add vertical spacing (1 empty row)
    wsData.push([]); // Add one empty row for spacing

    // Add Signature and related labels
    wsData.push([
      { v: "Signature" }, // Column 0: Signature
      "", // Column 1: Empty
      "", // Column 2: Empty
      "", // Column 3: Empty
      "", // Column 4: Empty
      "", // Column 5: Empty
      "", // Column 6: Empty
      "", // Column 7: Empty
      "", // Column 8: Empty
    ]);

    wsData.push([
      { v: "Printed Name" }, // Column 0: Printed Name
      "", // Column 1: Empty
      "", // Column 2: Empty
      "", // Column 3: Empty
      "", // Column 4: Empty
      "", // Column 5: Empty
      "", // Column 6: Empty
      "", // Column 7: Empty
      "", // Column 8: Empty
    ]);

    wsData.push([
      { v: "Designation" }, // Column 0: Designation
      "", // Column 1: Empty
      { v: `Head ${user.department_code}` },
      { v: "Acting Chief" },
      { v: "Supply Staff" },
      { v: `Head ${user.department_code}` },
      "", // Column 6: Empty
      "", // Column 7: Empty
      "", // Column 8: Empty
    ]);

    wsData.push([
      { v: "Date" }, // Column 0: Date
      "", // Column 1: Empty
      "", // Column 2: Empty
      "", // Column 3: Empty
      "", // Column 4: Empty
      "", // Column 5: Empty
      "", // Column 6: Empty
      "", // Column 7: Empty
      "", // Column 8: Empty
    ]);

    // Create the worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Define maximum widths for each column
    const maxWidths = [15, 6, null, 15, 15, 15]; // null for column 2 to use max content

    // Calculate column widths based on the content for column 2
    const colWidths = maxWidths.map((maxWidth, index) => {
      if (maxWidth === null) {
        // Calculate max length for column 2
        let maxLength = 0;
        wsData.forEach((row) => {
          const cellValue =
            typeof row[index] === "object" ? row[index].v : row[index];
          const cellLength = String(cellValue).length;
          maxLength = Math.max(maxLength, cellLength);
        });
        return { wch: maxLength }; // Use the max length for column 2
      }
      return { wch: maxWidth }; // Use the defined max width for other columns
    });

    // Set the column widths in the worksheet
    ws["!cols"] = colWidths;

    // Set merges for the title and alignment
    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, // Merge cells from A1 to H1 (title)
      { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } }, // Merge cells from A2 to D2 for "LGU: Universidad De Manila"
      { s: { r: 2, c: 0 }, e: { r: 2, c: 2 } }, // Merge cells from A4 to D4 for "Fund: Other Supplies and Materials Expenses"
      { s: { r: 2, c: 3 }, e: { r: 2, c: 5 } }, //
      { s: { r: 5, c: 0 }, e: { r: 5, c: 2 } }, // Merge cells from A7 to D7 for "Office: "
      { s: { r: 8, c: 0 }, e: { r: 8, c: 3 } },
      { s: { r: 8, c: 4 }, e: { r: 8, c: 5 } },
      { s: { r: 26, c: 1 }, e: { r: 26, c: 5 } },
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

    // Create the workbook and download it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RIS");
    XLSX.writeFile(wb, `RIS_${user.department_code}.xlsx`);
  };

  return (
    <button className="btn btn-outline" onClick={downloadHandler}>
      <GoDownload />
      Download
    </button>
  );
}
