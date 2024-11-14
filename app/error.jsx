"use client";
import React from "react";

const ErrorComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-red-200 to-red-400 border border-red-500 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-white">
        Oops! Something went wrong.
      </h1>
      <p className="mt-4 text-md text-gray-200">
        Please try refreshing the page or come back later.
      </p>
      <p className="mt-2 text-md text-gray-300 italic">
        If the problem persists, please contact support for assistance.
      </p>
      <button className="mt-6 px-4 py-2 bg-white text-red-500 font-semibold rounded-lg shadow hover:bg-red-100 transition duration-300">
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorComponent;
