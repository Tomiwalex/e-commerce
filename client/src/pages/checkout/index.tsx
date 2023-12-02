import React, { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import ShopContext, { IShopContext } from "../../context/shop-context";
import CartItem from "./cart-item";

const CheckoutPage = () => {
  const { products } = useGetProducts();
  const { getCartItemCount } = useContext<IShopContext>(ShopContext);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-5">Your Cart Items</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:grid-cols-4">
        {products.map((product: IProduct) => {
          if (getCartItemCount(product._id) !== 0) {
            return <CartItem product={product} />;
          }
        })}
      </div>
    </div>
  );
};

export default CheckoutPage;
