"use client";
import useInventoryStore from "@/components/store/store";
import React, { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import FormModal from "../modal/form-modal";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

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
  const btnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
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
    console.log(data);
    mutation.mutate(data, {
      onSuccess: (response) => {
        if (response && response.data) {
          console.log(response.data);
          updateSuccessModal(true);
          updateModalMessage(response.data.message);
          updateStatuss(response.data.status);
          queryClient.invalidateQueries({
            queryKey: ["admin-notification"],
          });

          cartItem.length = 0;
        }
      },
      onError: (error) => {
        updateSuccessModal(true);
        updateModalMessage(error.message);
        updateStatuss(error.status);
      },
    });

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
    <FormModal id="cart-modal" modalRef={modalRef}>
      <header className="flex flex-row gap-x-5 items-center">
        <Image
          src="/images/Universidad_de_Manila_seal.png"
          alt="Universidad_de_Manila_seal.png"
          width="100"
          height="100"
          priority
        />
        <section>
          <h1 className="font-bold  lg:text-5xl tracking-widest text-custom-bg-2 ">
            UNIVERSIDAD DE MANILA
          </h1>
          <p>Republic of the Philippines</p>
          <p>City of Manila</p>
        </section>
      </header>
      <h3 className="text-center font-black tracking-widest underline lg:text-2xl ">
        REQUISITION FORM
      </h3>
      <div className="mx-auto mt-5  ">
        <div className="flex flex-row justify-around font-bold">
          <label className="label cursor-pointer  w-fit space-x-4">
            <input type="checkbox" className="checkbox" name="office" />
            <span className="label-text">Office Supplies</span>
          </label>
          <label className="label cursor-pointer  w-fit space-x-4">
            <input type="checkbox" className="checkbox" name="other" />
            <span className="label-text">Other Supplies & Materials</span>
          </label>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <p className="w-80 ">
          Date : {` `}
          <span className="underline">{`${new Date().toLocaleDateString(
            "en-GB"
          )}`}</span>
        </p>
      </div>

      <div className="flex flex-row gap-x-2">
        <h3 className="font-bold">Office/COllege/Department : </h3>
        <span className="w-4/6 border-black border-b-2">
          {session.data?.user.name
            ? session.data?.user.name
            : session.data?.user.department}
          {session.status === "loading" && (
            <div className="skeleton h-4 w-28"></div>
          )}
        </span>
      </div>
      <form
        onSubmit={btnSubmit}
        className="relative top-10 p-4  w-full border border-black min-h-[80dvh] mb-20 space-y-10  "
      >
        <div className="overflow-auto">
          <table className="table text-sm ">
            <thead>
              <tr className="text-base text-center text-black">
                <th className="border border-black">QTY</th>
                <th className="border border-black ">UNIT</th>
                <th className="border border-black">DESCRIPTION</th>
                <th className="border border-black">Price</th>
                <th className="border border-black">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItem?.length > 0 ? (
                cartItem.map((item, index) => (
                  <tr key={item.item + index} className="text-center">
                    <td className="border border-black w-20">
                      <input
                        type="number"
                        name={"quantity"}
                        defaultValue={1}
                        min={1}
                        className="border w-full  text-center"
                      />
                    </td>
                    <td className="border border-black w-20 ">
                      <input
                        type="text"
                        name="item"
                        defaultValue={item.measurement}
                        disabled={!loading}
                        className="w-full disabled:bg-transparent"
                      />
                    </td>
                    <td className="border border-black">
                      <input
                        type="text"
                        name="description"
                        defaultValue={item.description}
                        disabled={!loading}
                        className="disabled:bg-transparent text-center min-w-full "
                      />
                    </td>
                    <td className="border border-black w-12 ">
                      <input
                        type="text"
                        name="price"
                        defaultValue={item.price}
                        disabled={!loading}
                        className="w-full disabled:bg-transparent text-center"
                      />
                      <input
                        type="hidden"
                        name="stock"
                        defaultValue={item.stock_no}
                      />
                      {/* <input type="hidden" name="id" defaultValue={item.stockHistories.id} /> */}
                    </td>

                    <td className="border border-black w-28">
                      <button
                        className="text-red-500 flex justify-center items-center gap-x-1 m-auto w-full"
                        onClick={() => btnDelete(item.id)}
                      >
                        <FaTrash size={".8rem"} />
                        <span className="hidden lg:block"> Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center  ">
                    No Item Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* <input
            type="text"
            name="purpose"
            placeholder="Purpose (Optional)"
            className="border border-black mt-20 p-4 rounded-xl"
          /> */}
        </div>

        {cartItem && cartItem.length !== 0 && (
          <select
            className={`select select-bordered w-full   bg-inherit  border border-black  `}
            name="purpose"
            defaultValue=""
            required
          >
            <option value="" disabled selected>
              Transaction Purpose
            </option>
            {data &&
              data?.data?.map((purpose, index) => {
                return (
                  <option value={purpose.name} key={index}>
                    {purpose.name}
                  </option>
                );
              })}
          </select>
        )}
        {cartItem?.length > 0 && (
          <button type="submit" className="btn btn-success btn-outline w-full">
            {loading ? "...Submiting" : "Submit Request"}
          </button>
        )}
      </form>
    </FormModal>
  );
};

export default React.memo(CartModal);
