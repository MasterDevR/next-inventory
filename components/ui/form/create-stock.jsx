"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/public/style/modal-form.module.css";
import StockType from "../select/select-stock-type";
import HideModal from "../button/hide-modal";
import OpenItemListBtn from "../button/open-modal";
import useInventoryStore from "@/components/store/store";
import Image from "next/image";

const InventoryForm = () => {
  const { updatePreStockList, preStockList } = useInventoryStore();
  const [formData, setFormData] = useState({});
  const modalRef = useRef();

  // manage input
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: files[0] }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  // manage stock type
  const handleStockTypeChange = (value) => {
    setFormData((prevFormData) => ({ ...prevFormData, stockType: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      if (value !== null && value !== undefined) {
        data.append(key, value);
      }
    }

    const formDataObject = {};

    data.forEach((value, key) => {
      formDataObject[key] = value;
    });

    formDataObject.id = Date.now().toString();

    updatePreStockList([formDataObject]);
  };

  return (
    <dialog id="create-stock" className="modal" ref={modalRef}>
      <div className="modal-box max-w-5xl">
        <div className="flex justify-between">
          <div className="w-auto">
            <OpenItemListBtn
              modalRef={modalRef}
              title="View List"
              id="stock-list"
            />
          </div>
          <div className="w-auto">
            <HideModal modalRef={modalRef} />
          </div>
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
                value={formData.name || ""}
                onChange={handleChange}
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
                value={formData.price || ""}
                onChange={handleChange}
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
                value={formData.description || ""}
                onChange={handleChange}
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
                value={formData.measurement || ""}
                onChange={handleChange}
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
                value={formData.stock || ""}
                onChange={handleChange}
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
                value={formData.order || ""}
                onChange={handleChange}
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
                value={formData.quantity || ""}
                onChange={handleChange}
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
                value={formData.reference || ""}
                onChange={handleChange}
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
                value={formData.consume || ""}
                onChange={handleChange}
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
                value={formData.distributor || ""}
                onChange={handleChange}
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
                onChange={handleChange}
                accept="image/jpeg, image/png"
                required
              />
              <label className={styles.userLabel} htmlFor="userInput_image">
                Image
              </label>
              {formData.image && (
                <div className="mt-2">
                  <Image
                    src={URL.createObjectURL(formData.image)}
                    alt="Selected"
                    height={50}
                    width={50}
                    priority
                  />
                </div>
              )}
            </div>
            <div className="w-5/12">
              <StockType
                value={formData.stockType || ""}
                onChange={handleStockTypeChange}
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

export default React.memo(InventoryForm);
