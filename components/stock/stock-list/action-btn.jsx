"use client";
import useInventoryStore from "@/components/store/store";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import BtnSave from "@/components/stock/stock-list/btn-save-list";
import { preStockItem } from "@/components/util/type/type";

const ActionBtn = ({ id, setItemIsEditing, itemIsEditing, images }) => {
  const { preStockList, overridePreStockList } = useInventoryStore();

  const editHandler = (itemId) => {
    setItemIsEditing((prev) => {
      const isEditing = prev.some((item) => item.id === itemId);
      if (isEditing) {
        return prev.filter((item) => item.id !== itemId);
      } else {
        return [...prev, { id: itemId }];
      }
    });
  };

  const deleteHandler = (itemId) => {
    const updatedItem = preStockList.filter((item) => item.id !== itemId);
    overridePreStockList(updatedItem);
  };
  const cancelBtn = (itemId) => {
    const item = preStockList?.find((item) => item.id === itemId);

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
        stock: "stock",
        image: "image",
        id: "",
      };

      Object.entries(fieldMapping).forEach(([prefix, property]) => {
        const element = document.getElementById(`${prefix}-${itemId}`);
        if (element) {
          if (element) {
            const imageFile = item;
            if (imageFile) {
              if (imageFile instanceof File) {
                element.src = URL.createObjectURL(imageFile);
              } else {
                element.src = imageFile;
              }
            } else {
              element.src = "";
            }
          } else {
            const value = item;
            element.value = value || "";
          }
        }
      });

      setItemIsEditing((prev) => {
        return prev.filter((item) => item.id !== itemId);
      });
    }
  };
  return (
    <div className="dropdown dropdown-end ">
      <div tabIndex={0} role="button" className="btn m-1">
        ...
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-28 p-2 shadow flex gap-y-5"
      >
        <li>
          {itemIsEditing?.some((i) => i.id === id) ? (
            <BtnSave
              itemId={id}
              key={id}
              setItemIsEditing={setItemIsEditing}
              images={images}
            />
          ) : (
            <button
              onClick={() => editHandler(id)}
              className="btn btn-success  btn-outline"
            >
              Edit
            </button>
          )}
        </li>
        <li>
          {itemIsEditing?.some((i) => i.id === id) ? (
            <button
              className="btn btn-error  btn-outline"
              onClick={() => cancelBtn(id)}
            >
              Cancel
            </button>
          ) : (
            <button
              className="btn btn-error  btn-outline"
              onClick={() => deleteHandler(id)}
            >
              Delete
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default React.memo(ActionBtn);
