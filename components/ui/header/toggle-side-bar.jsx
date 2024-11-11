"use client";
import React, { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { IoMdClose } from "react-icons/io"; // Import the cancel icon
import useInventoryStore from "@/components/store/store";

const ToggleSideBar = () => {
  const { updateShowSideBar, cartItem } = useInventoryStore();
  const [isOpen, setIsOpen] = useState(false);

  const sideBardHandler = () => {
    setIsOpen(!isOpen);
    updateShowSideBar();
  };

  return (
    <div className="flex-1">
      <button
        className="btn btn-ghost rounded-btn relative "
        onClick={sideBardHandler}
      >
        {isOpen ? (
          <IoMdClose className="text-inherit size-10 font-bold" />
        ) : (
          <MdMenuOpen className="text-inherit size-10 font-bold" />
        )}
      </button>
    </div>
  );
};

export default ToggleSideBar;
