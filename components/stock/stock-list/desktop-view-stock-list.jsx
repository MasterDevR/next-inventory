import React, { Fragment, useState } from "react";
import ActionBtn from "./action-btn";
import DesktopImage from "./desktop-image";
import { preStockItem } from "@/components/util/type/type";
import useInventoryStore from "@/components/store/store";

const StockListDesktop = ({ items }) => {
  const { theme } = useInventoryStore();

  const [itemIsEditing, setItemIsEditing] = useState([]);
  const [images, setImages] = useState({});

  return (
    <Fragment>
      <table className="table ">
        <thead className="sticky top-0 glass z-10">
          <tr
            className={`text-lg text-center ${
              theme !== true ? "text-black" : "text-white"
            }`}
          >
            <th>Item</th>
            <th>Stock No.</th>
            <th>Price</th>
            <th>Description</th>
            <th>Measurement</th>
            <th>Quantity</th>
            <th>Re Order Point</th>
            <th>Reference</th>
            <th>Type</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className={` ${theme !== true ? "text-black" : "text-white"}`}
            >
              <td>
                <input
                  id={`name-${item.id}`}
                  type="text"
                  disabled={!itemIsEditing.some((i) => i.id === item.id)}
                  defaultValue={item.name}
                  className={`input input-bordered border-black w-40 max-w-xs disabled:bg-inherit disabled:text-inherit disabled:border-none disabled:cursor-default`}
                />
              </td>
              <td>
                <input
                  id={`stock-${item.id}`}
                  type="text"
                  disabled={!itemIsEditing.some((i) => i.id === item.id)}
                  defaultValue={item.stock}
                  className={`input input-bordered border-black w-40 max-w-xs disabled:bg-inherit disabled:text-inherit disabled:border-none disabled:cursor-default`}
                />
              </td>
              <td>
                <input
                  id={`price-${item.id}`}
                  type="number"
                  disabled={!itemIsEditing.some((i) => i.id === item.id)}
                  defaultValue={item.price}
                  className={`input input-bordered border-black w-40 max-w-xs disabled:bg-inherit disabled:text-inherit disabled:border-none disabled:cursor-default`}
                />
              </td>
              <td>
                <input
                  id={`description-${item.id}`}
                  type="text"
                  disabled={!itemIsEditing.some((i) => i.id === item.id)}
                  defaultValue={item.description}
                  className={`input input-bordered border-black w-40 max-w-xs disabled:bg-inherit disabled:text-inherit disabled:border-none disabled:cursor-default`}
                />
              </td>
              <td>
                <input
                  id={`measurement-${item.id}`}
                  type="text"
                  disabled={!itemIsEditing.some((i) => i.id === item.id)}
                  defaultValue={item.measurement}
                  className={`input input-bordered border-black w-40 max-w-xs disabled:bg-inherit disabled:text-inherit disabled:border-none disabled:cursor-default`}
                />
              </td>
              <td>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  disabled={!itemIsEditing.some((i) => i.id === item.id)}
                  defaultValue={item.quantity}
                  className={`input input-bordered border-black w-40 max-w-xs disabled:bg-inherit disabled:text-inherit disabled:border-none disabled:cursor-default`}
                />
              </td>
              <td>
                <input
                  id={`order-${item.id}`}
                  type="text"
                  disabled={!itemIsEditing.some((i) => i.id === item.id)}
                  defaultValue={item.order}
                  className={`input input-bordered border-black w-40 max-w-xs disabled:bg-inherit disabled:text-inherit disabled:border-none disabled:cursor-default`}
                />
              </td>
              <td>
                <input
                  id={`reference-${item.id}`}
                  type="text"
                  disabled={!itemIsEditing.some((i) => i.id === item.id)}
                  defaultValue={item.reference}
                  className={`input input-bordered border-black w-40 max-w-xs disabled:bg-inherit disabled:text-inherit disabled:border-none disabled:cursor-default`}
                />
              </td>
              <td>
                <input
                  id={`stockType-${item.id}`}
                  type="text"
                  disabled={!itemIsEditing.some((i) => i.id === item.id)}
                  defaultValue={item.stockType}
                  className={`input input-bordered border-black w-40 max-w-xs disabled:bg-inherit disabled:text-inherit disabled:border-none disabled:cursor-default`}
                />
              </td>

              <td>
                <DesktopImage
                  item={item}
                  itemIsEditing={itemIsEditing}
                  setImages={setImages}
                />
              </td>
              <td>
                <ActionBtn
                  id={item.id}
                  setItemIsEditing={setItemIsEditing}
                  itemIsEditing={itemIsEditing || []}
                  images={images}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default React.memo(StockListDesktop);

/* 
Todo:



*/
