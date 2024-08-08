"use client";
import { useSession } from "next-auth/react";
import React from "react";

const OpenItemListBtn = (props) => {
  const session = useSession();
  const btnHandler = () => {
    try {
      console.log(props.id);
      if (props.id) {
        document.getElementById(`${props.id}`).showModal();
      } else {
        props.modalRef.current.showModal();
        console.log(props.modalRef.current);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {session.status == "loading" ? (
        <div className="skeleton h-10 w-52"></div>
      ) : (
        <button
          className="w-full rounded-lg border-2 border-emerald-500 p-2 text-emerald-500 transition-all delay-75 ease-in-out hover:bg-emerald-500 hover:text-white"
          onClick={btnHandler}
        >
          {`${props.title}`}
        </button>
      )}
    </>
  );
};

export default OpenItemListBtn;
