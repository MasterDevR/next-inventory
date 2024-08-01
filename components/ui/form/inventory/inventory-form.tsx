"use client";
import React, { useState } from "react";
import styles from "@/public/style/modal-form.module.css";
import SuccessToast from "../../toast/success";
import OpenItemListBtn from "../../button/open-modal";
import HideModal from "../../button/hide-modal";
import axios from "axios";
import { useSession } from "next-auth/react";
import SuccesModal from "../../moda/success";
import StockType from "./select-stock-type";
interface FormData {
  name: string;
  description: string;
  measurement: string;
  stock: string;
  order: string;
  quantity: string;
  reference: string;
  consume: string;
  image: string;
}
const InventoryForm = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const session = useSession();
  const [isMessage, setmessage] = useState<string>();
  const [status, setStatus] = useState<number>();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const form = e.currentTarget;

      const token = session.data?.user.accessToken;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/create-new-supply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setIsSuccess(true);
      setmessage(response.data.message);
      setStatus(response.data.status);
      const itemListTable = document.getElementById(
        `success`
      ) as HTMLDialogElement | null;
      if (itemListTable) {
        itemListTable.showModal();
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <dialog id="add-stock" className="modal">
      {isSuccess && (
        <SuccesModal
          message={`${isMessage}`}
          setIsSuccess={setIsSuccess}
          status={status}
        />
      )}
      <div className="modal-box max-w-5xl">
        <div className="relative float-end">
          <HideModal id="add-stock" />
        </div>
        <h3 className="pt-2 text-center text-lg font-bold tracking-widest text-black">
          ADD ITEM
        </h3>
        <div className="divider"></div>
        <div className="modal-action flex flex-col">
          <form
            method="dialog"
            className="flex w-full flex-wrap justify-between gap-5"
            onSubmit={submitHandler}
          >
            <div className={`${styles.inputGroup} `}>
              <input
                type="text"
                id="userInput"
                className={styles.input}
                name="item"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput">
                Item
              </label>
            </div>
            <div className={`${styles.inputGroup} `}>
              <input
                type="number"
                id="userInput"
                className={styles.input}
                name="price"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput">
                Price
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="userInput"
                className={styles.input}
                name="description"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput">
                Description
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="userInput"
                className={styles.input}
                name="measurement"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput">
                Measurement
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="userInput"
                className={styles.input}
                name="stock"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput">
                Stock No.
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="userInput"
                className={styles.input}
                name="order"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput">
                Re-Order Point
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="number"
                id="userInput"
                className={styles.input}
                name="quantity"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput">
                Quantity
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="userInput"
                className={styles.input}
                name="reference"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput">
                Reference
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="number"
                id="userInput"
                className={styles.input}
                name="consume"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput">
                No. Of Date To Consume
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="userInput"
                className={styles.input}
                name="distributor"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput">
                Distributor
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="file"
                id="userInput"
                className="file-input file-input-bordered w-full max-w-xs"
                name="image"
                required
                accept="image/jpeg, image/png"
              />
            </div>
            <div className={styles.inputGroup}>
              <StockType />
            </div>
            <button
              className="btn btn-success mt-5 w-full font-bold text-white"
              type="submit"
            >
              Add to list
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default InventoryForm;
