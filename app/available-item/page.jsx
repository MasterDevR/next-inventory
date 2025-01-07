"use client";
import React, { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import ItemCard from "@/components/ui/card/request-item-card";
import { useQueryClient } from "@tanstack/react-query";
import useInventoryStore from "@/components/store/store";
import { useRouter } from "next/navigation";
import NoDataFound from "@/components/stock/NoDataFound";

const Page = () => {
  const { role, token, requestorType } = useInventoryStore();
  const router = useRouter();
  const [searchItem, setSearchItem] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetchData({
    path: `/admin/get-available-stock/${searchItem}?page=${currentPage}`,
    token: token,
    key: "available-stock",
  });

  useEffect(() => {
    if (role !== "user") {
      router.push("/");
      return;
    }
  }, [role]);
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["available-stock"] });
  }, [searchItem, currentPage]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setSearchItem(value);
    } else {
      setSearchItem(undefined);
    }
    setCurrentPage(1);
  };

  const getPaginationRange = (currentPage, totalPages) => {
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const paginationRange = data
    ? getPaginationRange(currentPage, data.totalPages)
    : [];

  const canMakeRequest = () => {
    const currentMonth = new Date().getMonth() + 1;

    const academicAndAcademicSupportMonths = [1, 3, 5, 7, 9, 11];
    const adminMonths = [2, 4, 6, 8, 10, 12];

    switch (requestorType?.toLowerCase()) {
      case "executive":
        return true;
      case "academic":
      case "support":
        return academicAndAcademicSupportMonths.includes(currentMonth);
      case "admin":
        return adminMonths.includes(currentMonth);
      default:
        return false;
    }
  };

  const getCurrentMonthName = () => {
    return new Date().toLocaleString("default", { month: "long" });
  };

  const getAccessMessage = () => {
    const currentMonth = getCurrentMonthName();
    const isAllowed = canMakeRequest();

    switch (requestorType?.toLowerCase()) {
      case "executive":
        return `As an Executive, you have access to make requests at any time.`;
      case "academic":
      case "support":
        return `${requestorType} users are ${
          isAllowed ? "allowed" : "not allowed"
        } to make requests in ${currentMonth}. (Allowed months: Jan, Mar, May, Jul, Sept, Nov)`;
      case "admin":
        return `Admin users are ${
          isAllowed ? "allowed" : "not allowed"
        } to make requests in ${currentMonth}. (Allowed months: Feb, Apr, June, Aug, Oct, Dec)`;
      default:
        return "You do not have permission to make requests.";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-16 relative">
      {!canMakeRequest() && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <p className="text-xl font-semibold text-red-600">
            Access Restricted
          </p>
          <p className="text-gray-600 mt-2 text-center max-w-md">
            {getAccessMessage()}
          </p>
          <button
            onClick={() => router.back()}
            className="btn btn-error btn-outline mt-4"
          >
            Go Back
          </button>
        </div>
      )}

      <header className="flex flex-row items-center gap-x-5">
        <button
          onClick={() => router.back()}
          className="btn btn-error btn-outline text-white w-fit"
        >
          <LuArrowLeft color="red" size={"1rem"} />
          <span className="hidden lg:block">Back</span>
        </button>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search Item"
          className="border border-gray-400 rounded-2xl pl-10 w-96 lg:w-3/6  m-auto h-14"
        />
      </header>

      <div className="flex flex-row flex-wrap gap-6 md:gap-4 lg:gap-5 justify-center text-xs lg:text-sm  lg:w-5/6 lg:m-auto">
        {data && data.item && data.item?.length > 0 ? (
          data.item.map((item, index) => <ItemCard item={item} key={index} />)
        ) : (
          <div className="text-center w-full">
            <NoDataFound />
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {data && data.totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2  pb-52">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm"
          >
            &lt;
          </button>
          {paginationRange.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`btn btn-sm ${
                currentPage === page ? "btn-active" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === data.totalPages}
            className="btn btn-sm"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
