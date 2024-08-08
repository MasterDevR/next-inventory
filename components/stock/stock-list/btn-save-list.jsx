"use client";
import useInventoryStore from "@/components/store/store";
import React, { Dispatch, SetStateAction } from "react";
import { Item } from "@/components/util/type/type";

const BntSave = ({ itemId, setItemIsEditing, images }) => {
  const { preStockList } = useInventoryStore();

  const editHandler = () => {
    const item = preStockList.find((item) => item.id === itemId);
    const itemIndex = preStockList.findIndex((item) => item.id === itemId);
    const itemToUpdate = preStockList[itemIndex];

    const updatedValues = {};

    if (item) {
      const fieldMapping = {
        name: "name",
        price: "price",
        description: "description",
        measurement: "measurement",
        quantity: "quantity",
        order: "order",
        reference: "reference",
        stockType: "stockType",
        consume: "consume",
        stock: "stock",
        image: "image",
      };

      Object.entries(fieldMapping).forEach(([prefix, property]) => {
        const element = document.getElementById(`${prefix}-${itemId}`);

        if (element) {
          if (element) {
            const imgIndex = Object.keys(images).findIndex(
              (img) => img === itemId
            );
            const imgItem = Object.values(images)[imgIndex];

            if (imgItem) {
              if (imgItem) {
                updatedValues[property] = URL.createObjectURL(imgItem);
              } else {
                updatedValues[property] = imgItem;
              }
            }
          } else if (element instanceof HTMLInputElement) {
            updatedValues[property] = element.value;
          }
        }
      });

      updatedValues["id"] = itemId;
      preStockList[itemIndex] = {
        ...itemToUpdate,
        ...updatedValues,
      };
    }

    console.log(preStockList);
    setItemIsEditing((prev) => {
      return prev.filter((item) => item.id !== itemId);
    });
  };

  return (
    <div className="btn btn-success btn-outline" onClick={editHandler}>
      Save
    </div>
  );
};

export default BntSave;
