import React, { useContext } from "react";
import { IProduct } from "../../models/interfaces";
import ShopContext, { IShopContext } from "../../context/shop-context";
interface props {
  product: IProduct;
}
const CartItem = (props: props) => {
  const { _id, productName, price, stockQuantity, imageURL } = props.product;

  const { addToCart, removeFromCart, updateCartItemCount, getCartItemCount } =
    useContext<IShopContext>(ShopContext);

  const cartItemCount = getCartItemCount(_id);

  return (
    <div className="fade-in bg-gray-100 rounded-xl p-4 flex gap-x-3 relative overflow-hidden cursor-pointer">
      <img
        src={imageURL}
        alt={"image of " + productName}
        className="w-[90px] h-[90px] object-cover rounded-xl"
      />

      <div className="">
        <h2 className="font-semibold text-lg lg:text-xl text-gray-800">
          {productName}
        </h2>
        <p className="font-semibold text-gray-600">${price}</p>

        <div className="flex mt-2 relative z-[1]">
          {/* reduction sign */}
          <p
            onClick={() => removeFromCart(_id)}
            className="text-base font-semibold p-3 rounded-md bg-white inline-block mr-2 py-1 hover:bg-black hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
          >
            -
          </p>

          <input
            max={stockQuantity}
            min={0}
            value={cartItemCount}
            onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
            type="number"
            name="product-count"
            className="w-[60px] rounded focus:outline-none pl-1"
          />

          {/* addition sign */}
          <p
            onClick={() => addToCart(_id)}
            className=" text-base font-semibold p-3 py-1 rounded-md bg-white ml-2 hover:bg-black hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
          >
            +
          </p>
        </div>
      </div>

      {/* background text */}
      <h1 className="font-lobster absolute text-7xl lg:text-8xl -bottom-2 -right-4 text-gray-300 text-opacity-20">
        shoppy
      </h1>
    </div>
  );
};

export default CartItem;
