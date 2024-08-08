"use client";
import useInventoryStore from "@/components/store/store";
import React, { useEffect, useRef, useState } from "react";
import HideModal from "../../ui/button/hide-modal";
import StockListDesktop from "./desktop-view-stock-list";
import StockListMobile from "./mobile-view-stock-list";
import axios from "axios";
import { useSession } from "next-auth/react";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
const StockListModal = () => {
  const { theme } = useInventoryStore();
  const modalRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = useSession();
  const queryClient = useQueryClient();
  const {
    preStockList,
    resetPreStockList,
    updateSuccessModal,
    updateModalMessage,
    updateStatuss,
  } = useInventoryStore();

  const mutation = useMutation({
    mutationFn: (formData) => {
      const token = session.data?.user.accessToken;
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/create-new-supply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const formData = new FormData();
      preStockList.forEach((item, index) => {
        formData.append(`items[${index}]`, JSON.stringify(item));
        if (item.image && item.image instanceof File) {
          formData.append(`image`, item.image);
        }
      });
      // Log each entry in the FormData
      // for (const [key, value] of formData.entries()) {
      //   if (value instanceof File) {
      //     console.log(`${key}: ${value.name} (File)`);
      //   } else {
      //     console.log(`${key}: ${value}`);
      //   }
      // }
      mutation.mutate(formData, {
        onSuccess: (response) => {
          if (response && response.data) {
            console.log(response);
            updateSuccessModal(true);
            updateModalMessage(response.data.message);
            updateStatuss(response.data.status);
            queryClient.invalidateQueries({ queryKey: ["items"] });
          }
        },
        onError: (error) => {
          console.log(error);
        },
      });
      const itemListTable = document.getElementById(`success`);
      if (itemListTable) {
        itemListTable.showModal();
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const resetHandler = () => {
    resetPreStockList();
  };

  return (
    <dialog id="stock-list" className="modal w-5/6 m-auto" ref={modalRef}>
      <main
        className={`w-full shadow-2xl rounded-lg m-auto h-5/6 p-5  overflow-auto flex flex-col gap-y-10 ${
          theme === true ? "bg-custom-bg" : "bg-white"
        } ${theme !== true ? "text-black" : "text-white"}`}
      >
        <div className="max-w-20 relative self-end">
          <HideModal modalRef={modalRef} />
        </div>
        <h1 className="text-3xl font-bold text-green-500 text-center">
          New Stock List.
        </h1>
        <div className="overflow-x-auto border-2 h-[55dvh] hidden lg:block ">
          <StockListDesktop items={preStockList} />
        </div>
        <div className="relative top-5 space-y-5">
          <StockListMobile items={preStockList} />
        </div>
        <div className="flex flex-row w-full  justify-evenly items-stretch">
          <button
            className="btn btn-success tracking-widest font-bold text-lg min-w-52 btn-outline"
            onClick={resetHandler}
          >
            Clear
          </button>
          <button
            className="btn btn-success text-white tracking-widest font-bold text-lg min-w-52"
            onClick={submitHandler}
            disabled={isSubmitting || !preStockList.length > 0}
          >
            Done
          </button>
        </div>
      </main>
    </dialog>
  );
};

export default StockListModal;
