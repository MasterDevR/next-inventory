"use client";
import React, { useRef } from "react";
import styles from "@/public/style/modal-form.module.css";
import StockType from "../select/select-stock-type";
import HideModal from "../button/hide-modal";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useInventoryStore from "@/components/store/store";

const InventoryForm = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  const modalRef = useRef();
  const { updateSuccessModal, updateModalMessage, updateStatuss } =
    useInventoryStore();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const token = session.data?.user.accessToken;
      return await axios.post(
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
      const formData = new FormData(e.target);

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
          updateSuccessModal(true);
          updateModalMessage(error.message);
          updateStatuss(error.status);
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <dialog id="create-stock" className="modal" ref={modalRef}>
      <div className="modal-box max-w-5xl">
        <div className="w-fit relative float-end">
          <HideModal modalRef={modalRef} />
        </div>
        <h3 className="pt-2 text-center text-lg font-bold tracking-widest text-green-500">
          ADD ITEM
        </h3>
        <div className="divider"></div>
        <div className="modal-action flex flex-col">
          <form
            method="dialog"
            className="flex w-full flex-wrap justify-between gap-5"
            id="create-stock-form"
            onSubmit={submitHandler}
          >
            <div className={`${styles.inputGroup}`}>
              <input
                type="text"
                id="userInput_name"
                className={styles.input}
                name="name"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput_name">
                Item
              </label>
            </div>
            <div className={`${styles.inputGroup}`}>
              <input
                type="number"
                id="userInput_price"
                className={styles.input}
                name="price"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput_price">
                Price
              </label>
            </div>
            <div className={`${styles.inputGroup}`}>
              <input
                type="text"
                id="userInput_description"
                className={styles.input}
                name="description"
                required
              />
              <label
                className={styles.userLabel}
                htmlFor="userInput_description"
              >
                Description
              </label>
            </div>
            <div className={`${styles.inputGroup}`}>
              <input
                type="text"
                id="userInput_measurement"
                className={styles.input}
                name="measurement"
                required
              />
              <label
                className={styles.userLabel}
                htmlFor="userInput_measurement"
              >
                Measurement
              </label>
            </div>
            <div className={`${styles.inputGroup}`}>
              <input
                type="text"
                id="userInput_stock"
                className={styles.input}
                name="stock"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput_stock">
                Stock No.
              </label>
            </div>
            <div className={`${styles.inputGroup}`}>
              <input
                type="text"
                id="userInput_order"
                className={styles.input}
                name="order"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput_order">
                Re-Order Point
              </label>
            </div>
            <div className={`${styles.inputGroup}`}>
              <input
                type="number"
                id="userInput_quantity"
                className={styles.input}
                name="quantity"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput_quantity">
                Quantity
              </label>
            </div>
            <div className={`${styles.inputGroup}`}>
              <input
                type="text"
                id="userInput_reference"
                className={styles.input}
                name="reference"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput_reference">
                Reference
              </label>
            </div>
            <div className={`${styles.inputGroup}`}>
              <input
                type="number"
                id="userInput_consume"
                className={styles.input}
                name="consume"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput_consume">
                No. Of Date To Consume
              </label>
            </div>
            <div className={`${styles.inputGroup}`}>
              <input
                type="text"
                id="userInput_distributor"
                className={styles.input}
                name="distributor"
                required
              />
              <label
                className={styles.userLabel}
                htmlFor="userInput_distributor"
              >
                Distributor
              </label>
            </div>
            <div className={`${styles.inputGroup}`}>
              <input
                type="file"
                id="userInput_image"
                className={styles.input}
                name="image"
                accept="image/jpeg, image/png"
                required
              />
            </div>
            <div className="w-5/12">
              <StockType />
            </div>
            <button
              className="btn btn-success mt-5 w-full font-bold text-white"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default React.memo(InventoryForm);
