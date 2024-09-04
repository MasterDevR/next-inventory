"use client";

import useInventoryStore from "@/components/store/store";
import { useEffect } from "react";
import AdminDashboard from "@/components/admin-dashboard/container";
const ProtectedPage = () => {
  const { role, token } = useInventoryStore();

  return (
    <div className="space-y-20">
      {role && role === "department" ? (
        <div>Department</div>
      ) : (
        <div className=" ">
          <AdminDashboard />
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
