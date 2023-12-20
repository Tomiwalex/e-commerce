import React, { createContext, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { IProduct } from "../models/interfaces";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";

export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getCartItemCount: (itemId: string) => number;
  getTotalCartAmount: () => number;
  checkOut: () => void;
}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getCartItemCount: () => 0,
  getTotalCartAmount: () => 0,
  checkOut: () => null,
};
const ShopContext = createContext(defaultVal);

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});

  const { products } = useGetProducts();
  const { headers } = useGetToken();

  const getCartItemCount = (itemID: string): number => {
    if (itemID in cartItems) {
      return cartItems[itemID];
    } else {
      return 0;
    }
  };

  // the add to cart function
  //##########
  const addToCart = (itemID: string) => {
    if (!cartItems[itemID]) {
      setCartItems((prev) => ({ ...prev, [itemID]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
    }
  };

  // the cart item reduction and remove from cart function
  // ############
  const removeFromCart = (itemID: string) => {
    if (!cartItems[itemID]) return;

    if (cartItems[itemID] === 0) return;

    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }));
  };

  const updateCartItemCount = (newAmount: number, itemID: string) => {
    if (newAmount < 0) return;

    setCartItems((prev) => ({ ...prev, [itemID]: newAmount }));
  };

  // function to calculate the total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo: IProduct = products.find(
          (product) => product._id === item
        );

        totalAmount += cartItems[item] * itemInfo?.price;
      }
    }

    return totalAmount;
  };

  // the checkout function
  const checkOut = async () => {
    const body = { customerID: localStorage.getItem("userID"), cartItems };

    try {
      await axios.post("http://localhost:3001/products/checkout", body, {
        headers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const contextVal = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItemCount,
    getTotalCartAmount,
    checkOut,
  };
  return (
    <ShopContext.Provider value={contextVal}>{children}</ShopContext.Provider>
  );
};

export default ShopContext;
