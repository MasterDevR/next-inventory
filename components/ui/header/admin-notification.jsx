"use client";
import React, { Fragment, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import useInventoryStore from "@/components/store/store";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import axios from "axios";
import Link from "next/link";
const Admin_Notification = () => {
  const [toggleBtn, setToggleBtn] = useState(false);
  const queryClient = useQueryClient();
  const { token } = useInventoryStore();
  const { data, isLoading } = useFetchData({
    path: "/admin/admin-notification",
    key: "admin-notification",
  });
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/update-notification`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-notification"] });
    },
  });
  const btnHandler = () => {
    setToggleBtn(!toggleBtn);
    mutation.mutate();
  };
  return (
    <Fragment>
      <div
        tabIndex={0}
        role="button"
        className={`btn btn-ghost rounded-btn relative  text-white ${
          toggleBtn && "bg-custom-bg-3"
        }`}
        onClick={btnHandler}
      >
        <IoMdNotifications size={"1.7rem"} cursor="pointer" />
        {data && data.result.some((item) => item.viewed === false) && (
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
                    pathname: `/transaction`,
                    query: {
                      id: item.transaction_id,
                    },
                  }}
                >
                  <h3>
                    <span>Office : </span>
                    <span className="font-light">{item.department}</span>
                  </h3>
                  <h4>
                    <span>Purpose : </span>
                    <span className="font-light">
                      {item.transaction_purpose}
                    </span>
                  </h4>
                  <h4>
                    <span>ID : </span>
                    <span className="font-light">{item.transaction_id}</span>
                  </h4>
                  <h5>
                    <span>No of Item : </span>
                    <span className="font-light">{item.no_item}</span>
                  </h5>
                </Link>
              </li>
            );
          })}
      </ul>
    </Fragment>
  );
};

export default Admin_Notification;
