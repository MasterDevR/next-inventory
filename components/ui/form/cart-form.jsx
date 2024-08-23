"use client";
import useInventoryStore from "@/components/store/store";
import React, { useRef, useState } from "react";
import HideModal from "../button/hide-modal";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import FormModal from "../modal/form-modal";
const CartModal = () => {
  const {
    cartItem,
    overrideCartItem,
    department_id,
    updateModalMessage,
    updateSuccessModal,
    updateStatuss,
  } = useInventoryStore();
  const [loading, setIsLoading] = useState(false);
  const modalRef = useRef();
  const { data } = useFetchData({
    path: "/user/get-transaction-purposes",
    key: "transaction-purpose",
  });

  const btnSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const formData = new FormData(e.target);
      const items = [];
      const purpose = formData.get("purpose");
      const itemCount = formData.getAll("item").length; // Number of items

      for (let i = 0; i < itemCount; i++) {
        items.push({
          item: formData.getAll("item")[i],
          description: formData.getAll("description")[i],
          price: formData.getAll("price")[i],
          stock: formData.getAll("stock")[i],
          quantity: formData.getAll("quantity")[i],
        });
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/create-transaction/${department_id}`,
        { data: items, purpose }
      );
      updateSuccessModal(true);
      updateModalMessage(response.data.message);
      updateStatuss(response.data.status);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
      cartItem.length = 0;
      console.log(cartItem);
    }
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
      <h3 className="pt-2 text-center text-lg font-bold tracking-widest text-green-500">
        Cart Items
      </h3>
      <form onSubmit={btnSubmit} className="relative top-10 p-4  w-full ">
        <div className="overflow-x-auto">
          <table className="table text-base  ">
            <thead>
              <tr className="text-base">
                <th></th>
                <th>Item</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock No.</th>
                <th>Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItem?.length > 0 ? (
                cartItem.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        name="item"
                        defaultValue={item.item}
                        disabled={!loading}
                        className="w-32 disabled:bg-transparent  "
                      />
                    </td>
                    <td>
                      <textarea
                        name="description"
                        defaultValue={item.description}
                        disabled={!loading}
                        rows="2"
                        cols="15"
                        className="resize-none disabled:bg-transparent "
                      ></textarea>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="price"
                        defaultValue={item.price}
                        disabled={!loading}
                        className="w-32 disabled:bg-transparent"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="stock"
                        defaultValue={item.stock_no}
                        disabled={!loading}
                        className="w-32 disabled:bg-transparent"
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        name={"quantity"}
                        defaultValue={1}
                        className="border border-black w-14 p-1 text-center"
                      />
                    </td>
                    <td>
                      <button
                        className="text-red-500 flex justify-center items-center gap-x-1 m-auto"
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
        </div>

        {cartItem && cartItem.length !== 0 && (
          <select
            className={`select select-bordered w-full border bg-inherit  `}
            name="purpose"
          >
            <option value="" disabled>
              Select Purpose
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
        <button
          type="submit"
          className="btn btn-success btn-outline w-full my-5 "
          disabled={cartItem.length <= 0 || loading}
        >
          {loading ? "...Submiting" : "Submit Request"}
        </button>
      </form>
    </FormModal>
  );
};

export default React.memo(CartModal);
