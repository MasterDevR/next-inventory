import React from "react";

const HiddenForm = ({ data }) => {
  const handleSelectChange = (e) => {
    console.log("Selected value:", e.target.value); // Logs the selected value on change
  };

  return (
    <select
      className="select select-bordered w-full"
      name="item"
      onChange={handleSelectChange} // Add onChange handler
      required
    >
      {data &&
        data.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
    </select>
  );
};

export default HiddenForm;
