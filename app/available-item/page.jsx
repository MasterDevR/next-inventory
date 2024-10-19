"use client";
import React, { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import ItemCard from "@/components/ui/card/request-item-card";
import { useQueryClient } from "@tanstack/react-query";
import useInventoryStore from "@/components/store/store";
import { useRouter } from "next/navigation";

const Page = () => {
  const { role, token } = useInventoryStore();
  const router = useRouter();
  const [searchItem, setSearchItem] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useFetchData({
    path: `/admin/get-available-stock/${searchItem}?page=${currentPage}`, // Include current page
    token: token,
    key: "available-stock",
  });

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
    setCurrentPage(1); // Reset to the first page on new search
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-16">
      <header className="flex flex-row items-center gap-x-5">
        {role && role === "user" && (
          <button
            onClick={() => router.back()}
            className="btn btn-error btn-outline text-white w-32"
          >
            <LuArrowLeft color="red" size={"1rem"} />
            <span className="hidden lg:block">Back</span>
          </button>
        )}
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search Item"
          className="border border-gray-400 rounded-2xl pl-10 w-3/6 m-auto h-14"
        />
      </header>
      <div className="flex flex-row flex-wrap gap-6 md:gap-4 lg:gap-5 justify-center text-xs lg:text-sm pb-52">
        {data &&
          data.item.map((item, index) => <ItemCard item={item} key={index} />)}
      </div>

      {/* Pagination Controls */}
      {data && data.totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
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
