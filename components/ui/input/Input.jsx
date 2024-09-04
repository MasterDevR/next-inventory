import React from "react";

const Input = ({ title, name, type, defaultValue, step }) => {
  return (
    <label className="input input-bordered flex items-center gap-2 text-sm lg:text-lg">
      {title && <span>{title}</span>}
      {type === "file" ? (
        <input
          type={type}
          className="file-input file-input-bordered w-full"
          placeholder={title}
          name={name}
          accept="image/jpeg, image/png"
          required
        />
      ) : (
        <input
          type={type}
          className={`grow`}
          placeholder={title}
          name={name}
          required
          step="any"
          defaultValue={defaultValue && defaultValue}
        />
      )}
    </label>
  );
};

export default Input;
