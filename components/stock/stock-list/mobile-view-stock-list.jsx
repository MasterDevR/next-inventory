import Image from "next/image";
import React from "react";
import ActionBtn from "./action-btn";

const StockListMobile = ({ items }) => {
  return (
    <>
      {items?.map((item, index) => {
        // Create an object URL for the image file
        const imageUrl =
          item.image instanceof File ? URL.createObjectURL(item.image) : ""; // Handle case if image is not a File

        return (
          <details
            className="collapse border-2 border-black block lg:hidden collapse-arrow"
            key={index}
          >
            <summary className="collapse-title text-xl font-medium  ">
              <div className="flex flex-wrap justify-between gap-10">
                {item.name}
                <ActionBtn />
              </div>
            </summary>
            <div className="collapse-content flex flex-col gap-5">
              <span className="absolute self-end">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                )}
              </span>
              <div>
                <span className="text-black font-bold mr-3"> Item:</span>
                <span>{item.name}</span>
              </div>
              <div>
                <span className="text-black font-bold mr-3"> Price:</span>
                <span>{item.price}</span>
              </div>
              <div>
                <span className="text-black font-bold mr-3"> Description:</span>
                <span>{item.description}</span>
              </div>
              <div>
                <span className="text-black font-bold mr-3"> Item:</span>
                <span>{item.measurement}</span>
              </div>
              <div>
                <span className="text-black font-bold mr-3"> Quantity:</span>
                <span>{item.quantity}</span>
              </div>
              <div>
                <span className="text-black font-bold mr-3">
                  Re Order Point:
                </span>
                <span>{item.order}</span>
              </div>
              <div>
                <span className="text-black font-bold mr-3"> Reference:</span>
                <span>{item.reference}</span>
              </div>
              <div>
                <span className="text-black font-bold mr-3"> Stock Type:</span>
                <span>{item.stockType}</span>
              </div>
              <div>
                <span className="text-black font-bold mr-3"> Stock No.:</span>
                <span>{item.stock}</span>
              </div>
            </div>
          </details>
        );
      })}
    </>
  );
};

export default React.memo(StockListMobile);
