"use client";
import React from "react";

type modalProps = {
  id?: string;
  title: string;
};
const OpenItemListBtn = ({ id, title }: modalProps) => {
  const btnHandler = () => {
    const itemListTable = document.getElementById(
      `${id}`
    ) as HTMLDialogElement | null;
    if (itemListTable) {
      itemListTable.showModal();
    }
  };
  return (
    <button
      className="w-full rounded-lg border-2 border-emerald-500 p-2 text-emerald-500 transition-all delay-75 ease-in-out hover:bg-emerald-500 hover:text-white"
      onClick={btnHandler}
    >
      {`${title}`}
    </button>
  );
};

export default OpenItemListBtn;
