"use client";
import React from "react";
import { MdMenuOpen } from "react-icons/md";
import useInventoryStore from "@/components/store/store";

const ToggleSideBar = () => {
  const { updateShowSideBar, cartItem } = useInventoryStore();
  const sideBardHandler = () => {
    updateShowSideBar();
  };

  return (
    <div className="flex-1">
      <button
        className=" btn btn-ghost rounded-btn relative  text-white "
        onClick={sideBardHandler}
      >
        <MdMenuOpen className="text-inherit size-10 font-bold" />
      </button>
    </div>
  );
};

export default ToggleSideBar;
