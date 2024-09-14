"use client";
import useInventoryStore from "@/components/store/store";
import Image from "next/image";
import React, { useEffect } from "react";

const ItemCard = ({ item }) => {
  const { updateCartItem, cartItem } = useInventoryStore();

  const btnHandler = () => {
    const exist = cartItem.filter((i) => {
      return i.item === item.item;
    });
    if (exist.length > 0) {
      return;
    }
    updateCartItem(item);
  };

  return (
    <div
      className={`w-44 md:w-48 lg:w-64 h-auto p-4 bg-white rounded-3xl shadow-lg text-xs lg:text-sm flex flex-col justify-between`}
    >
      <section className="flex flex-col items-center w-full gap-y-10 p-2 min-h-44 max-h-max lg:h-72 flex-grow">
        <Image
          src={item.image}
          alt={item.item}
          width="100"
          height="100"
          priority
          className="aspect-square object-contain lg:w-50 lg:h-32"
        />

        <div className="font-bold w-full space-y-2 uppercase">
          <p className="break-words">
            <span className="font-light">{item.description}</span>
          </p>
          <p className="text-red-500">
            Price : <span className="font-light">{`₱ ${item.price}`}</span>
          </p>
        </div>
      </section>
      <button
        className="btn btn-primary hover:font-bold text-white disabled:text-gray-400 w-full text-xs mt-auto"
        onClick={btnHandler}
        disabled={cartItem.includes(item)}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default React.memo(ItemCard);
