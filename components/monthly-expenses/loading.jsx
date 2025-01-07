import React from "react";

const Loading = () => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
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
        {/* Skeleton rows for 5 rows */}
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <tr key={rowIndex} className="bg-white">
            {Array.from({ length: 13 }).map((_, colIndex) => (
              <td key={colIndex} className="p-2 border border-gray-300">
                <div className="animate-pulse bg-gray-200 h-6 w-full"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Loading;
