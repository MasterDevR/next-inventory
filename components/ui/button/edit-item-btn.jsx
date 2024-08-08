import React from "react";

const EditBtn = (props) => {
  const editHandler = () => {
    if (props.id) {
      document.getElementById(`${props.id}`).showModal();
    }
  };

  return (
    <div
      onClick={editHandler}
      className="w-4/6 bg-green-500 p-2 rounded-md hover:bg-green-600 text-center cursor-pointer"
    >
      {props.title}
    </div>
  );
};

export default EditBtn;
