"use client";
import React from "react";

const RequestSchedule = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });

  // Helper function to check if month is allowed for each type
  const isAllowedMonth = (type) => {
    const academicSupportMonths = [1, 3, 5, 7, 9, 11];
    const adminMonths = [2, 4, 6, 8, 10, 12];

    switch (type) {
      case "executive":
        return true;
      case "academic":
      case "support":
        return academicSupportMonths.includes(currentMonth);
      case "admin":
        return adminMonths.includes(currentMonth);
      default:
        return false;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Request Schedule
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Current month: <span className="font-medium">{currentMonthName}</span>
        </p>
      </div>

      <div className="">
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Side - Schedule Legend */}
          <div className="p-2 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Access Roles:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Executive - Special Access (All Months)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Admin - Feb, Apr, June, Aug, Oct, Dec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Academic & Support - Jan, Mar, May, Jul, Sept, Nov
              </li>
            </ul>
          </div>

          {/* Right Side - Current Month Status */}
          <div className="bg-gray-50 rounded-lg p-2">
            <h3 className="font-medium text-gray-800 mb-3">Current Access:</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-sm font-medium text-gray-700">
                    Executive
                  </span>
                </div>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  Always Allowed
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-sm font-medium text-gray-700">
                    Admin
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    isAllowedMonth("admin")
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {isAllowedMonth("admin") ? "Allowed" : "Not Allowed"}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span className="text-sm font-medium text-gray-700">
                    Academic & Support
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    isAllowedMonth("academic")
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {isAllowedMonth("academic") ? "Allowed" : "Not Allowed"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSchedule;
