"use client";
import React from "react";
import useInventoryStore from "@/components/store/store";
import Admin_Notification from "./admin-notification";
import Department_Notification from "./department-notification";
const Notification = () => {
  const { role } = useInventoryStore();
  return (
    <div className="dropdown dropdown-end">
      {role !== "user" ? <Admin_Notification /> : <Department_Notification />}
    </div>
  );
};

export default Notification;
