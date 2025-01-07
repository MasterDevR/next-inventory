import React from "react";

const Select = ({ data, title, onChange, defaultValue, width }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <select
      className={`select select-bordered ${
        width ? width : "w-full"
      } uppercase text-xs lg:text-base`}
      defaultValue={defaultValue ? defaultValue : ""}
      onChange={handleChange}
      required
    >
      {title && (
        <option value="" disabled>
          {title}
        </option>
      )}
      {Array.isArray(data) && data?.length > 0 ? (
        data.map((item, index) => {
          if (typeof item === "object" && item !== null) {
            return (
              <option key={item.id || index} value={item.name || item.id}>
                {item.name}
              </option>
            );
          } else {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          }
        })
      ) : (
        <option disabled>No options available</option>
      )}
    </select>
  );
};

export default Select;
