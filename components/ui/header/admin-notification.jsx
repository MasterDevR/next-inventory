"use client";
import React, { Fragment, useState, useMemo, useEffect, use } from "react";
import { IoMdNotifications, IoMdWarning } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";
import useInventoryStore from "@/components/store/store";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
const Admin_Notification = () => {
  const [page, setPage] = useState(3);
  const [isViewed, setIsViewed] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const queryClient = useQueryClient();
  const { token } = useInventoryStore();

  const { data, isLoading } = useFetchData({
    path: `/admin/admin-notification?get=${page}`,
    token: token,
    key: "admin-notification",
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["admin-notification"] });
  }, [page, isViewed]);

  // when toggleBtn is true, update the fecth data to /update-notification

  const sortedNotifications = useMemo(() => {
    if (!data) return [];
    const combined = [
      ...(data.result || []),
      ...(data.lowStockResult || []).map((item) => ({
        ...item,
        isLowStock: true,
        updated_at: item.updated_at || new Date().toISOString(),
      })),
    ];
    return combined.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );
  }, [data]);

  const hasUnviewedNotifications = useMemo(() => {
    if (!data) return false;
    const result = data && data.result?.some((item) => item.viewed === false);
    return result;
  }, [data]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 5);
  };

  const viewNotification = () => {
    setToggleBtn(!toggleBtn);
    setIsViewed((prev) => !prev);

    const updateNotification = async () => {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/update-notification`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    };
    // await updateNotification();
    updateNotification();
  };
  return (
    <Fragment>
      <div
        tabIndex={0}
        role="button"
        className={`btn btn-ghost rounded-btn relative`}
        onClick={viewNotification}
      >
        <IoMdNotifications size={"1.7rem"} cursor="pointer" />
        {hasUnviewedNotifications && (
          <span className="absolute top-2 left-7 block size-3 rounded-full bg-red-600"></span>
        )}
        {hasUnviewedNotifications && (
          <span className="absolute top-2 left-7 block size-3 rounded-full bg-red-600"></span>
        )}
      </div>

      <ul
        tabIndex={0}
        className={`${
          toggleBtn ? "flex" : "hidden"
        } absolute bg-base-100 right-0 md:right-12 w-full md:w-auto min-w-[300px] md:min-w-[25dvw] rounded-lg shadow-lg p-3 md:p-5 gap-y-3 md:gap-y-5 flex-col max-h-[70dvh] md:max-h-[50dvh] overflow-y-auto text-xs md:text-sm z-50`}
      >
        {isLoading && <h1>Loading...</h1>}
        {sortedNotifications.map((item, index) => (
          <li
            key={
              item && item.isLowStock
                ? item.stock.item
                : item.transaction_id + index
            }
            className={`rounded-lg shadow-inner shadow-gray-300 p-2 ${
              item.isLowStock
                ? "bg-yellow-100"
                : "hover:bg-black hover:bg-opacity-10 cursor-pointer"
            }`}
          >
            {item.isLowStock ? (
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="font-medium flex items-center">
                    <IoMdWarning className="text-yellow-500 mr-1" />
                    {item.stock.item}
                  </p>
                  <p className="text-sm">
                    Quantity on hand:{" "}
                    <span className="font-bold">
                      {item.stock.quantity_on_hand}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.updated_at).toLocaleString()}
                  </p>
                </div>
                {item.stock.image && (
                  <Image
                    src={item.stock.image}
                    alt={item.stock.item}
                    height={40}
                    width={40}
                    className="rounded-md object-cover ml-2"
                  />
                )}
              </div>
            ) : (
              <Link
                href={{
                  pathname: `/transaction`,
                  query: {
                    id: item.transaction_id,
                  },
                }}
                className={`flex gap-x-2 items-center ${
                  item && item.viewed === false ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex-shrink-0">
                  <Image
                    src={item.Transaction?.user.image}
                    alt={item.department}
                    height={50}
                    width={50}
                    className="aspect-square rounded-full"
                  />
                </div>
                <aside className="flex-1">
                  <h3 className="font-semibold">
                    <span>Office: </span>
                    <span className="font-normal">{item.department}</span>
                  </h3>
                  <h4>
                    <span>Purpose: </span>
                    <span className="font-light line-clamp-1">
                      {item.transaction_purpose}
                    </span>
                  </h4>
                  <h4>
                    <span>ID: </span>
                    <span className="font-light">{item.transaction_id}</span>
                  </h4>
                  <h5>
                    <span>No of Item: </span>
                    <span className="font-light">{item.no_item}</span>
                  </h5>
                  <h5 className="text-xs text-gray-500">
                    {new Date(item.updated_at).toLocaleString()}
                  </h5>
                </aside>
                {item.Transaction?.item_image && (
                  <div className="flex-shrink-0 ml-2">
                    <Image
                      src={item.Transaction.item_image}
                      alt="Item"
                      height={50}
                      width={50}
                      className="aspect-square rounded-md object-cover"
                    />
                  </div>
                )}
              </Link>
            )}
          </li>
        ))}
        {data && data.hasMore !== false && (
          <li className="text-center">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </li>
        )}
      </ul>
    </Fragment>
  );
};

export default Admin_Notification;
