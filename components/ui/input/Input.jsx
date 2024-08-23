import React from "react";

const Input = ({ title, name, type }) => {
  return (
    <label className="input input-bordered flex items-center gap-2 text-sm lg:text-lg">
      <span>{title}</span>
      {type === "file" ? (
        <input
          type={type}
          className="grow"
          placeholder={title}
          name={name}
          accept="image/jpeg, image/png"
          required
        />
      ) : (
        <input
          type={type}
          className="grow"
          placeholder={title}
          name={name}
          required
        />
      )}
    </label>
  );
};

export default Input;
