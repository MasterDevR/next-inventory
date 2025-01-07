"use client";
import useInventoryStore from "@/components/store/store";
import AdminDashboard from "@/components/admin-dashboard/container";
import UserDashboard from "@/components/user-dashboard/dashboard";

const ProtectedPage = () => {
  const { role } = useInventoryStore();
  return (
    <div className="space-y-20 ">
      {role && role === "user" ? <UserDashboard /> : <AdminDashboard />}
    </div>
  );
};

export default ProtectedPage;
