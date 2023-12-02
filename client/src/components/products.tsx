import React, { useContext } from "react";
import ShopContext, { IShopContext } from "../context/shop-context";

const Products = ({ products }) => {
  const { addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);
  const count = getCartItemCount(products._id);
  console.log(count);

  return (
    <div className="fadeIn flex flex-col justify-between h-full">
      <img
        src={products.imageURL}
        alt={products.productName}
        className="w-full h-48 md:h-52 object-cover"
      />

      <div className="px-4 py-2 flex-1">
        <p className="text-gray-700 text-lg font-semibold">
          {products.productName}
        </p>
        <p className="text-sm text-gray-500 py-1">{products.description}</p>
        <p className="text-lg font-bold text-gray-700">${products.price}</p>
      </div>

      <button
        style={{
          backgroundColor: products.stockQuantity < 1 ? "gray" : "#1f1f00",
        }}
        className="mx-auto hover:ring-gray-700 hover:ring-2 ring-offset-2 duration-300 transition-all ease-in-out text-white font-semibold py-3 px-2 rounded-md my-3 block w-[calc(100%-24px)]"
        onClick={() => addToCart(products._id)}
      >
        {products.stockQuantity < 1
          ? "Out of Stock"
          : `Add to Cart ${count > 0 ? "(" + count + ")" : ""}`}
      </button>
    </div>
  );
};

export default Products;
