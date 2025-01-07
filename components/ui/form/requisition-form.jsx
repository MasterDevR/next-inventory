"use client";
import useInventoryStore from "@/components/store/store";
import React, { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import FormModal from "../modal/form-modal";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import VerifyOtpModal from "../modal/verify-otp-modal";
const CartModal = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  const {
    cartItem,
    overrideCartItem,
    department_id,
    updateModalMessage,
    updateSuccessModal,
    updateStatuss,
    token,
  } = useInventoryStore();
  const [loading, setIsLoading] = useState(false);
  const modalRef = useRef();
  const { data } = useFetchData({
    path: "/user/get-transaction-purposes",
    token: token,
    key: "transaction-purpose",
  });
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isData, setIsData] = useState(null);
  const mutation = useMutation({
    mutationFn: async (formData) => {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/create-transaction/${department_id}`,
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

  const generateOtpHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/generate-request-otp/${department_id}`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 200) {
        setOtpModalVisible(true);
      } else {
        updateSuccessModal(true);
        updateModalMessage(response.data.message);
        updateStatuss(response.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isVerified && isData) {
      mutation.mutate(isData, {
        onSuccess: (response) => {
          if (response && response.data) {
            updateSuccessModal(true);
            updateModalMessage(response.data.message);
            updateStatuss(response.data.status);
            queryClient.invalidateQueries({
              queryKey: ["admin-notification"],
            });
            cartItem?.length = 0;
            // set is data to null
            setIsData(null);
          }
        },
        onError: (error) => {
          updateSuccessModal(true);
          updateModalMessage(error.message);
          updateStatuss(error.status);
        },
      });
    }
  }, [isVerified]);

  const btnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await generateOtpHandler();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });
    setIsData(data);

    setIsLoading(false);
  };
  const btnDelete = (id) => {
    try {
      const removeItem =
        cartItem &&
        cartItem.filter((i) => {
          return i.id !== id;
        });
      overrideCartItem(removeItem);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <FormModal id="cart-modal" modalRef={modalRef}>
        {otpModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <VerifyOtpModal
              setOtpModalVisible={setOtpModalVisible}
              setIsVerified={setIsVerified}
            />
          </div>
        )}

        <form
          onSubmit={btnSubmit}
          className="relative top-10 p-4 w-full border  rounded-lg min-h-[80dvh] mb-20 shadow-md space-y-10 bg-white"
        >
          <div className="overflow-auto space-y-10">
            <div className="text-center py-4  border-2">
              <h1 className="text-2xl font-bold ">Cart Items</h1>
              <p className="text-sm text-gray-600 mt-2">
                Note: If you refresh the page, the items in your cart will be
                lost.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Please ensure all items are accurately selected and quantities
                are correct before submitting your request.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                You will receive a confirmation email once your request is
                processed.
              </p>
            </div>

            {/* Table Layout for Larger Screens */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cartItem?.length > 0 ? (
                cartItem.map((item, index) => (
                  <div
                    key={item.item + index}
                    className="flex flex-col items-center justify-center p-4 shadow-md rounded-lg"
                  >
                    <div className="text-center space-y-2 p-4 bg-white shadow-md rounded-lg">
                      <h4 className="font-semibold text-lg text-gray-800">
                        <input
                          type="text"
                          name="description"
                          defaultValue={item.description}
                          disabled={!loading}
                          className="disabled:bg-transparent text-center min-w-full "
                        />
                      </h4>
                      <div className="flex justify-between  w-full mt-2">
                        <p className="text-sm text-gray-500  flex items-center gap-x-5">
                          {`Unit:`}
                          <input
                            type="text"
                            name="item"
                            defaultValue={item.measurement}
                            disabled={!loading}
                            className="w-8 disabled:bg-transparent"
                          />
                        </p>
                        <p className="text-sm text-gray-500  flex items-center gap-x-5">
                          {`Price:`}

                          <input
                            type="text"
                            name="price"
                            defaultValue={item.price}
                            disabled={!loading}
                            className="w-12 disabled:bg-transparent text-center"
                          />
                          {/* <input
                            type="hidden"
                            name="price"
                            defaultValue={item.price}
                            className="w-12 disabled:bg-transparent text-center"
                          /> */}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity</span>
                        <input
                          type="number"
                          name={`quantity`}
                          defaultValue={1}
                          min={1}
                          className="border border-gray-300 w-2/4 text-center rounded-md mt-2"
                        />
                      </div>
                      <input
                        type="hidden"
                        name="stock"
                        defaultValue={item.stock_no}
                      />
                      <button
                        className="text-red-500 mt-2 hover:text-red-700 flex gap-x-4 m-auto items-center"
                        onClick={() => btnDelete(item.id)}
                      >
                        <FaTrash size=".8rem" /> <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center bg-gray-100 rounded-lg p-5  col-span-full">
                  No Cart Item Found.
                </p>
              )}
            </div>
          </div>

          {cartItem && cartItem.length !== 0 && (
            <select
              className="select select-bordered w-full bg-inherit border border-black"
              name="purpose"
              defaultValue=""
              required
            >
              <option value="" disabled selected>
                Transaction Purpose
              </option>
              {data?.data?.map((purpose, index) => (
                <option value={purpose.name} key={index}>
                  {purpose.name}
                </option>
              ))}
            </select>
          )}
          {cartItem?.length > 0 && (
            <button
              type="submit"
              className="btn btn-success btn-outline w-full"
            >
              {loading ? "...Submitting" : "Submit Request"}
            </button>
          )}
        </form>
      </FormModal>
    </>
  );
};

export default React.memo(CartModal);
