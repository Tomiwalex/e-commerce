import React, { createContext, useState } from "react";

export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getCartItemCount: (itemId: string) => number;
}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getCartItemCount: () => 0,
};
const ShopContext = createContext(defaultVal);

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});

  const getCartItemCount = (itemID: string): number => {
    if (itemID in cartItems) {
      return cartItems[itemID];
    } else {
      return 0;
    }
  };

  const addToCart = (itemID: string) => {
    if (!cartItems[itemID]) {
      setCartItems((prev) => ({ ...prev, [itemID]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
    }
  };
  const removeFromCart = (itemID: string) => {};
  const updateCartItemCount = (newAmount: Number, itemID: string) => {};

  const contextVal = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItemCount,
  };
  return (
    <ShopContext.Provider value={contextVal}>{children}</ShopContext.Provider>
  );
};

export default ShopContext;
