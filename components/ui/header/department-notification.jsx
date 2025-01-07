"use client";
import Link from "next/link";
import React, { Fragment, useState, useMemo, useEffect } from "react";
import { IoMdNotifications } from "react-icons/io";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const Department_Notification = () => {
  const [toggleBtn, setToggleBtn] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const { token, department_id } = useInventoryStore();
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetchData({
    path: `/user/user-notification/${department_id}`,
    token: token,
    key: "user-notification",
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["user-notification"] });
  }, [isViewed]);
  const btnHandler = async () => {
    setToggleBtn(!toggleBtn);
    setToggleBtn(!toggleBtn);
    setIsViewed((prev) => !prev);

    const updateNotification = async () => {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/update-notification`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    };
    updateNotification();
  };
  const hasUnviewedNotifications = useMemo(() => {
    if (!data) return false;
    const result = data && data.result?.some((item) => item.viewed === false);
    return result;
  }, [data]);

  return (
    <Fragment>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost rounded-btn"
        onClick={btnHandler}
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
        } absolute bg-base-100 right-12 min-w-[25dvw]  rounded-lg shadow-lg p-5 gap-y-5 flex-col max-h-[50dvh] overflow-y-auto `}
      >
        {isLoading && <h1>Loading...</h1>}
        {
          // if no data show no data found add style background and text color and border
          data && data.result.length === 0 && (
            <div className="flex justify-center items-center h-full bg-gray-100 rounded-lg p-5">
              <h1 className="text-gray-500">No Available Notification</h1>
            </div>
          )
        }
        {data &&
          data.result?.map((item, index) => {
            return (
              <li
                key={item.id + index}
                className={`hover:bg-black hover:bg-opacity-10 rounded-lg cursor-pointer shadow-inner shadow-gray-300 p-2 ${
                  item.viewed === false && "bg-gray-100"
                }`}
                onClick={() => {
                  setToggleBtn(false);
                }}
              >
                <Link
                  href={{
                    pathname: `/transaction/${item.transaction_id}`,
                    query: {
                      id: item.transaction_id,
                    },
                  }}
                >
                  <h3>
                    <span>
                      {item.Status.name === "ready"
                        ? "Your requested item is ready to pickup "
                        : item.Status.name === "completed"
                        ? "Your Request has been completed "
                        : "Your Request has been "}
                    </span>
                    <strong
                      className={`${
                        item.Status.name === "rejected"
                          ? "text-red-500"
                          : item.Status.name === "approved"
                          ? "text-green-500"
                          : item.Status.name === "ready"
                          ? "text-blue-500"
                          : item.Status.name === "completed"
                          ? "text-yellow-500"
                          : ""
                      }`}
                    >
                      {item.Status.name}
                    </strong>
                  </h3>
                  <h4 className="font-bold">
                    Transaction ID:
                    <span className="font-light">{item.transaction_id}</span>
                  </h4>
                  {/* set both date bold but the actual date is normal */}
                  <h5 className="font-bold">
                    Date Requested:{" "}
                    <span className="font-light">
                      {item.created_at &&
                        new Date(item.created_at).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })}
                    </span>
                  </h5>{" "}
                  <h5 className="font-bold">
                    Date of Approval:{" "}
                    <span className="font-light">
                      {item.updated_at &&
                        new Date(item.updated_at).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })}
                    </span>
                  </h5>
                </Link>
              </li>
            );
          })}
      </ul>
    </Fragment>
  );
};

export default Department_Notification;
