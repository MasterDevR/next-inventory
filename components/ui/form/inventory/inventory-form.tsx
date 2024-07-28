"use client";
import React, { useState } from "react";
import styles from "@/public/style/modal-form.module.css";
import SuccessToast from "../../toast/success";
import OpenItemListBtn from "../../button/open-modal";
import HideModal from "../../button/hide-modal";
import axios from "axios";
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
  const [isSuccess, setIsSuccess] = useState(false);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const form = e.currentTarget;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/create-new-supply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        console.log("time to reset");
        form.reset();
      }
    } catch (err) {
      console.log("Cauth ERROR ", err);
    } finally {
      setIsSuccess(false);
    }
  };

  return (
    <dialog id="add-stock" className="modal">
      {isSuccess && <SuccessToast message="Adding Success." />}
      <div className="modal-box max-w-5xl">
        <div className="flex items-center justify-between">
          <OpenItemListBtn title="Open" />
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
                type="text"
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
                type="text"
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
                type="file"
                id="userInput"
                className={styles.input}
                name="image"
                required
                accept="image/jpeg, image/png"
              />
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
