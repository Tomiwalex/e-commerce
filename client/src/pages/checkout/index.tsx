import React, { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import ShopContext, { IShopContext } from "../../context/shop-context";
import CartItem from "./cart-item";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { products } = useGetProducts();
  const navigate = useNavigate();

  const { getCartItemCount, getTotalCartAmount } =
    useContext<IShopContext>(ShopContext);
  const totalAmount = getTotalCartAmount();

  return (
    <div className="p-5">
      {totalAmount > 0 ? (
        <div>
          <h1 className="text-xl font-bold mb-5">Your Cart Items</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:grid-cols-4">
            {products.map((product: IProduct) => {
              if (getCartItemCount(product._id) !== 0) {
                return <CartItem product={product} />;
              }
            })}
          </div>
          {/* check out info */}
          <div className="text-center mt-20">
            <div className="mb-5">
              <b className="text-xl font-semibold">
                Sub-total:{" "}
                <span className="text-gray-600">
                  {" "}
                  ${totalAmount.toFixed(2)}
                </span>
              </b>
            </div>

            <div className="">
              <button
                onClick={() => navigate("/")}
                className="mr-2 text-white bg-gray-900 p-4 text-base rounded hover:bg-white hover:text-black hover:border-black transition-all duration-300 ease-in-out border border-white "
              >
                Continue Shopping
              </button>

              {/* Checkout button */}
              <button className="text-white bg-gray-900 p-4 text-base rounded hover:bg-white hover:text-black hover:border-black transition-all duration-300 ease-in-out border border-white ">
                Checkout
              </button>
            </div>
          </div>{" "}
        </div>
      ) : (
        <div className="flex flex-1 justify-center items-center">
          <h1 className="text-xl font-semibold">Your Cart is Empty</h1>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
