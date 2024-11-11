"use client";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
const Department_Notification = () => {
  const [toggleBtn, setToggleBtn] = useState(false);

  const { token, department_id } = useInventoryStore();
  const { data, isLoading } = useFetchData({
    path: `/user/user-notification/${department_id}`,
    token: token,
    key: "user-notification",
  });
  const btnHandler = () => {
    setToggleBtn(!toggleBtn);
    // mutation.mutate();
  };
  return (
    <Fragment>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost rounded-btn"
        onClick={btnHandler}
      >
        <IoMdNotifications size={"1.7rem"} cursor="pointer" />
      </div>
      <ul
        tabIndex={0}
        className={`${
          toggleBtn ? "flex" : "hidden"
        } absolute bg-base-100 right-12 min-w-[25dvw]  rounded-lg shadow-lg p-5 gap-y-5 flex-col max-h-[50dvh] overflow-y-auto `}
      >
        {isLoading && <h1>Loading...</h1>}
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
                          : ""
                      }`}
                    >
                      {item.Status.name}
                    </strong>
                  </h3>
                  <h4>Transaction ID : {item.transaction_id}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </Fragment>
  );
};

export default Department_Notification;
