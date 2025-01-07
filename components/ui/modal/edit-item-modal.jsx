"use client";
import React, { Fragment, useState } from "react";
import styles from "@/public/style/modal-form.module.css";
import axios from "axios";
import HideModal from "../button/hide-modal";
import useInventoryStore from "../../store/store";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

const EditItemModal = ({ data, modalRef }) => {
  const queryClient = useQueryClient();
  const session = useSession();
  const { updateSuccessModal, updateModalMessage, updateStatuss } =
    useInventoryStore();
  const [isSubmitting, setSubmitting] = useState(false);
  const [IsImage, setImageData] = useState({
    urlBlobImg: "",
    image: undefined,
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const token = session.data?.user.accessToken;
      let stock_no = data[0].stock_no;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/edit-stock/${stock_no}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    },
  });

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      mutation.mutate(formData, {
        onSuccess: (response) => {
          if (response && response.data) {
            updateSuccessModal(true);
            updateModalMessage(response.data.message);
            updateStatuss(response.data.status);
            queryClient.invalidateQueries({ queryKey: ["stock"] });
          }
        },
        onError: (error) => {
          updateSuccessModal(true);
          updateModalMessage(error.message);
          updateStatuss(error.status);
        },
      });
      setSubmitting(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImageData({ urlBlobImg: imgUrl, image: file });
    }
  };

  return (
    <dialog
      id="edi-modal"
      className="modal text-black"
      ref={modalRef}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="modal-box max-w-3xl p-6 space-y-8">
        <div className="flex justify-end  w-full">
          <div className="w-fit">
            <HideModal modalRef={modalRef} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-center bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="mb-2 md:mb-0 md:mr-4">
            <h1 className="text-lg font-semibold text-gray-700">
              Item:{" "}
              <span className="font-normal text-gray-600">
                {data && data[0]?.item}
              </span>
            </h1>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-700">
              Stock Number:{" "}
              <span className="font-normal text-gray-600">
                {data && data[0]?.stock_no}
              </span>
            </h1>
          </div>
        </div>
        <form
          onSubmit={submitHandler}
          className="flex flex-wrap justify-between gap-4"
        >
          {data &&
            data.map((item, index) => (
              <Fragment key={index}>
                <div className={`${styles.inputGroup} w-full md:w-1/2`}>
                  <input
                    type="text"
                    className={styles.input}
                    name="name"
                    required
                    defaultValue={item.item}
                  />
                  <label className={styles.userLabel} htmlFor="userInput_name">
                    Item
                  </label>
                </div>
                <div className={`${styles.inputGroup} w-full md:w-1/2`}>
                  <input
                    type="text"
                    className={styles.input}
                    name="description"
                    defaultValue={item.description}
                    required
                  />
                  <label
                    className={styles.userLabel}
                    htmlFor="userInput_description"
                  >
                    Description
                  </label>
                </div>
                <div className={`${styles.inputGroup} w-full md:w-1/2`}>
                  <input
                    type="number"
                    className={styles.input}
                    name="price"
                    defaultValue={item.price}
                    required
                  />
                  <label className={styles.userLabel} htmlFor="userInput_price">
                    Price
                  </label>
                </div>
                <div className={`${styles.inputGroup} w-full md:w-1/2`}>
                  <input
                    type="text"
                    className={styles.input}
                    name="measurement"
                    defaultValue={item.measurement}
                    required
                  />
                  <label
                    className={styles.userLabel}
                    htmlFor="userInput_measurement"
                  >
                    Measurement
                  </label>
                </div>
                <div className={`${styles.inputGroup} w-full md:w-1/2`}>
                  <input
                    type="text"
                    className={styles.input}
                    name="stock_no"
                    defaultValue={item.stock_no}
                    required
                  />
                  <label className={styles.userLabel} htmlFor="userInput_stock">
                    Stock No.
                  </label>
                </div>
                <div className={`${styles.inputGroup} w-full md:w-1/2`}>
                  <input
                    type="number"
                    className={styles.input}
                    name="quantity"
                    defaultValue={item.quantity_on_hand}
                    required
                  />
                  <label
                    className={styles.userLabel}
                    htmlFor="userInput_quantity"
                  >
                    Quantity
                  </label>
                </div>
                {/* <div className={`${styles.inputGroup} w-full md:w-1/2`}>
                  <input
                    type="text"
                    className={styles.input}
                    name="order"
                    defaultValue={item.re_order_point}
                    required
                  />
                  <label className={styles.userLabel} htmlFor="userInput_order">
                    Re-Order Point
                  </label>
                </div> */}
                {/* <div className={`${styles.inputGroup} w-full md:w-1/2`}>
                  <input
                    type="text"
                    className={styles.input}
                    name="reference"
                    defaultValue={item.reference}
                    required
                  />
                  <label
                    className={styles.userLabel}
                    htmlFor="userInput_reference"
                  >
                    Reference
                  </label>
                </div> */}
                <div className={`${styles.inputGroup} w-full md:w-1/2`}>
                  <input
                    type="number"
                    className={styles.input}
                    name="consume"
                    defaultValue={item.consume_date}
                    required
                  />
                  <label
                    className={styles.userLabel}
                    htmlFor="userInput_consume"
                  >
                    No. Of Date To Consume
                  </label>
                </div>
                <div className={`${styles.inputGroup} w-full md:w-1/2`}>
                  <input
                    type="text"
                    className={styles.input}
                    name="distributor"
                    defaultValue={item.distributor}
                    required
                  />
                  <label
                    className={styles.userLabel}
                    htmlFor="userInput_distributor"
                  >
                    Distributor
                  </label>
                </div>
                <div className={`${styles.inputGroup} w-full`}>
                  <input
                    type="file"
                    className="hidden"
                    name="image"
                    id="image"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="image"
                    className="w-full border border-black py-2 cursor-pointer flex justify-between items-center"
                  >
                    <span className="bg-slate-900 text-white p-2">
                      CHOOSE FILE:
                    </span>
                    <span className="p-2">Select New Image</span>
                  </label>
                </div>
                {item.image && (
                  <div className="mt-4 flex justify-center self-center  w-full ">
                    <Image
                      src={
                        IsImage.urlBlobImg !== ""
                          ? IsImage.urlBlobImg
                          : item.image
                      }
                      height={150}
                      width={150}
                      alt="Current item"
                      className="w-auto h-auto object-cover rounded-md"
                    />
                  </div>
                )}
              </Fragment>
            ))}
          <button
            type="submit"
            className="btn btn-success text-white w-full lg:text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default React.memo(EditItemModal);
