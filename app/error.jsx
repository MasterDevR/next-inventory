"use client";
import React from "react";

const ErrorComponent = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-100 border border-red-400 rounded-md text-red-700">
      <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
      <p className="mt-2 text-lg">
        {error.message || "An unexpected error occurred."}
      </p>
      <p className="mt-4 text-md text-gray-600">
        Please try refreshing the page or come back later.
      </p>
    </div>
  );
};

export default ErrorComponent;
