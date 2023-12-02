import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const Navbar = () => {
  return (
    <div className="flex justify-between py-5 items-center px-5 shadow-sm">
      <div className="flex items-center">
        <h1 className="font-lobster text-2xl font-bold text-gray-700 tracking-wider cursor-pointer">
          <ShoppingBagIcon
            sx={{ fontSize: "30px", position: "relative", bottom: "4px" }}
          />
          SHOPPY
        </h1>
      </div>

      <div className="">
        <Link
          to="/"
          className="text-gray-600 font-semibold mx-2 transition-all duration-300 hover:text-gray-800"
        >
          Home
        </Link>

        <Link
          to="/purchased-items"
          className="text-gray-600 font-semibold mx-2 transition-all duration-300 hover:text-gray-800"
        >
          Purchases
        </Link>
        <Link
          to="/checkout"
          className="ml-1 transition-all  p-3 rounded-md duration-300 hover:bg-gray-200"
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize: "25px", color: "gray" }} />
        </Link>
        {/* <Link to='/auth'>Shop</Link> */}
      </div>
    </div>
  );
};

export default Navbar;
