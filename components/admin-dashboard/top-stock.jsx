"use client";
import React from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import Image from "next/image";

const TopStock = () => {
  const { token } = useInventoryStore();
  const { data, isLoading } = useFetchData({
    path: "/admin/get-top-stock",
    token: token,
    key: "top-stock",
  });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 pb-0 flex-1">
        <div className="flex flex-col gap-3 h-full justify-around">
          {data &&
            data.topStocks?.map((item, index) => (
              <div
                key={index + item.stock_no}
                className="group bg-white p-5 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-blue-200
                shadow-sm shadow-gray-500
                "
              >
                <div className="flex items-start gap-3">
                  {/* Rank and Image */}
                  <div className="relative">
                    <div
                      className={`absolute -left-1 -top-1 w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium
                    ${
                      index % 2 === 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                    >
                      {index + 1}
                    </div>
                    <Image
                      src={item.image}
                      alt={item.description}
                      width={48}
                      height={48}
                      className="rounded-md object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="truncate">
                        <h3 className="font-medium text-gray-900 truncate">
                          {item.description}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Stock No: {item.stock_no}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 group-hover:bg-blue-100">
                        {item.quantity_on_hand || 0} units
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2 w-full">
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                              ? "bg-gray-500"
                              : index === 2
                              ? "bg-orange-500"
                              : "bg-blue-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              (item.quantity / 100) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-4">
              <p className="text-gray-500">Loading...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && (!data?.topStocks || data.topStocks.length === 0) && (
            <div className="text-center py-4">
              <p className="text-gray-500">No items to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopStock;
