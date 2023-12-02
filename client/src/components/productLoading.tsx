import React from "react";
import "../App.css";

const ProductLoadingDisplay = () => {
  return (
    <div className="transition-all duration-300 ease-in-out rounded-md h-80 bg-gray-200 flex items-center justify-center">
      <p className="spin h-7 w-7 rounded-full border-x-black border-x-[2px]"></p>
    </div>
  );
};

export default ProductLoadingDisplay;
