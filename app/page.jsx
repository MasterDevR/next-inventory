"use client";
import BarChart from "@/components/admin-dashboard/bar-chart";

import useInventoryStore from "@/components/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import AdminDashboard from "@/components/admin-dashboard/container";
const ProtectedPage = () => {
  const { role } = useInventoryStore();
  const session = useSession();
  return (
    <div className="space-y-20 ">
      <div className=" ">
        <AdminDashboard />
      </div>
      <div className=" lg:w-3/6 w-fit h-80 relative top-20  overflow-x-auto shadow-lg rounded-lg">
        <BarChart />
      </div>
    </div>
  );
};

export default ProtectedPage;
