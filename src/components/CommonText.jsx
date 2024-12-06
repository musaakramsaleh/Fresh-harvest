import React from "react";

const CommonText = ({ small, header }) => {
  return (
    <div>
      <p className="bg-[#A6A6A6] bg-opacity-10 font-bold inline px-2 py-1 mx-auto text-[#749B3F]">
        {small}
      </p>
      <h2 className="mt-2 font-bold text-2xl md:text-[48px]">{header}</h2>
    </div>
  );
};

export default CommonText;
