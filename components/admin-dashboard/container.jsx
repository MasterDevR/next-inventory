import React from "react";
import ItemCard from "../ui/card/item-card";
const AdminDashboard = () => {
  return (
    <div className="snap-x flex gap-x-5 overflow-x-auto ">
      <div className="snap-center">
        <ItemCard />
      </div>
    </div>
  );
};

export default AdminDashboard;
