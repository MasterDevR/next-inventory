"use client";
import useInventoryStore from "@/components/store/store";
import Image from "next/image";
import React, { useEffect } from "react";
const ItemCard = ({ item }) => {
  const { theme, updateCartItem, cartItem } = useInventoryStore();

  const btnHandler = () => {
    const exist = cartItem.filter((i) => {
      return i.item === item.item;
    });
    if (exist.length > 0) {
      console.log(cartItem.includes(item));

      return;
    }
    updateCartItem(item);
  };

  return (
    <div
      className={`card relative w-80 h-fit shadow-md p-2  ${
        theme === true ? "glass" : "bg-base-100"
      }   `}
    >
      <section className="flex w-full h-52">
        <figure className="w-2/6  ">
          <Image
            src={item.image}
            alt={item.item}
            width={70}
            height={70}
            className="aspect-square "
          />
        </figure>
        <div className="w-4/6 self-center space-y-2 font-bold  ">
          <h2 className=" text-base">
            Item : <span className="font-light">{item.item}</span>
          </h2>
          <p className="text-base break-words">
            Description : <span className="font-light">{item.description}</span>
          </p>
          <p className="text-base">
            Unit : <span className="font-light">{item.measurement}</span>{" "}
          </p>
          <p className="text-base">
            Price : <span className="font-light">₱ {item.price}</span>
          </p>
        </div>
      </section>
      <button
        className="btn btn-primary hover:font-bold text-white disabled:text-gray-400"
        onClick={btnHandler}
        disabled={cartItem.includes(item)}
      >
        ADD TO REQUEST
      </button>
    </div>
  );
};

export default React.memo(ItemCard);
