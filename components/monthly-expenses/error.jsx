import React from "react";

const ErrorComponent = () => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-300 ">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border border-gray-300">Department</th>
          {/* Skeleton headers for full month names from January to December */}
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (
            <th key={index} className="p-2 border border-gray-300">
              <div className="animate-pulse h-4 w-full flex items-center justify-center">
                {month}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={13} className="p-2 text-center text-red-500">
            An error occurred while fetching the data.
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ErrorComponent;
