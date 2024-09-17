import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import * as XLSX from "xlsx";

export default function ButtonExportExcel({ data, filename }) {
  const handleExport = () => {
    // Create a new workbook and add a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Adjust column widths
    const columns = Object.keys(data[0]);
    const columnWidths = columns.map((column) => {
      if (column === "customerName") {
        return { wpx: 200 }; // Set "Customer Name" column width to 200px
      } else {
        // Calculate the max width needed for other columns
        const maxLength = Math.max(
          ...data.map((row) => (row[column] || "").toString().length),
          column.length // Ensure the header is also considered
        );
        return { wch: maxLength + 2 }; // Adding 2 for some padding
      }
    });

    worksheet["!cols"] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate buffer and trigger download
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xff;

    // Create a blob and trigger a download
    const blob = new Blob([buf], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Generate the filename with the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .replace(/T/, "_")
      .replace(/\..+/, "")
      .replace(/:/g, "-"); // Replace colons with dashes
    link.download = `${filename}_${formattedDate}.xlsx`;

    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button className="buttonExport" onClick={handleExport}>
      <DocumentArrowDownIcon className="iconAsideBar" />
      <span className="buttonTextDark">Export</span>
    </button>
  );
}
