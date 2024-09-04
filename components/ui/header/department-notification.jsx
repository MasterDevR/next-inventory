"use client";
import React, { Fragment } from "react";
import { IoMdNotifications } from "react-icons/io";

const Department_Notification = () => {
  return (
    <Fragment>
      <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
        <IoMdNotifications size={"1.7rem"} color="white" cursor="pointer" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 min-w-96 max-w-max p-2 shadow"
      >
        <li>
          <a>Item 3</a>
        </li>
        <li>
          <a>Item 4</a>
        </li>
      </ul>
    </Fragment>
  );
};

export default Department_Notification;
