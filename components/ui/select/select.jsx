import React from "react";

const Select = ({ data, title }) => {
  return (
    <select className="select select-bordered w-full" defaultValue={title}>
      <option disabled value={title}>
        {title}
      </option>
      {data &&
        data?.type.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
    </select>
  );
};

export default Select;
