"use client";
import React from "react";
import { FaCartPlus } from "react-icons/fa";
import useInventoryStore from "@/components/store/store";

const Cart = () => {
  const { cartItem } = useInventoryStore();
  return (
    <div
      className="btn btn-ghost rounded-btn relative  "
      onClick={() => {
        document.getElementById("cart-modal").showModal();
      }}
    >
      <FaCartPlus size={"1.7rem"} />

      {cartItem?.length > 0 && (
        <span className="absolute top-4 left-7  block size-2 rounded-full bg-red-600"></span>
      )}
    </div>
  );
};

export default Cart;
