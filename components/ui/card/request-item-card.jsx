"use client";
import useInventoryStore from "@/components/store/store";
import Image from "next/image";
import React, { useEffect } from "react";

const itemCard = ({ item }) => {
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
      className={`card  w-96 h-fit shadow-md p-2  ${
        theme === true ? "glass" : "bg-base-100"
      }   `}
    >
      <section className="flex w-full h-52 ">
        <figure className="w-2/6  ">
          <Image
            src={item.image}
            alt={item.item}
            width={100}
            height={100}
            className="aspect-square "
          />
        </figure>
        <div className="w-4/6 self-center space-y-2 font-bold">
          <h2 className=" text-sm md:text-lg">
            Item : <span className="font-light">{item.item}</span>
          </h2>
          <p className="text-sm md:text-lg break-words">
            Description : <span className="font-light">{item.description}</span>
          </p>
          <p className="text-sm md:text-lg">
            Unit : <span className="font-light">{item.measurement}</span>{" "}
          </p>
          <p className="text-sm md:text-lg">
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

export default React.memo(itemCard);
