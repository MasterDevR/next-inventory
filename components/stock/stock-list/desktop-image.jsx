import React, { Fragment, useRef, useState } from "react";
import Image from "next/image";

const DesktopImage = ({ item, itemIsEditing, setImages }) => {
  const fileInputRef = useRef(null);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [images, setLocalImages] = useState({});

  const fileHandler = (e, itemId) => {
    const file = e.target.files?.[0];

    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setLocalImages((prevImages) => ({
        ...prevImages,
        [itemId]: newImageUrl,
      }));
      setImages((prevImages) => ({ ...prevImages, [itemId]: file }));
    }
  };

  const handleImageClick = (itemId) => {
    setCurrentItemId(itemId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (currentItemId) {
      fileHandler(e, currentItemId);
    }
  };

  const imageUrl =
    images[item.id] ||
    (typeof item.image === "string"
      ? item.image
      : item.image
      ? URL.createObjectURL(item.image)
      : "");

  return (
    <Fragment>
      {imageUrl && (
        <Image
          id={`image-${item.id}`}
          src={imageUrl}
          alt={item.name}
          height={50}
          width={50}
          priority
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
          }}
          className={`${
            itemIsEditing.some((i) => i.id === item.id)
              ? "border-2 cursor-pointer"
              : "bg-white cursor-default"
          }`}
          onClick={() =>
            itemIsEditing.some((i) => i.id === item.id) &&
            handleImageClick(item.id)
          }
        />
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Fragment>
  );
};

export default React.memo(DesktopImage);
