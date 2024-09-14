"use client";

import useInventoryStore from "@/components/store/store";
import AdminDashboard from "@/components/admin-dashboard/container";
const ProtectedPage = () => {
  const { role, token } = useInventoryStore();

  return (
    <div className="space-y-20 ">
      {role && role === "user" ? (
        <div>Department</div>
      ) : (
        <div>
          <AdminDashboard />
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
