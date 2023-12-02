import axios from "axios";
import { useState, useEffect } from "react";
import { useGetToken } from "./useGetToken";
export const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const { headers } = useGetToken();

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await axios.get(
        "http://localhost:3001/products",
        { headers }
      );
      setProducts(fetchedProducts.data.products);
    } catch (err) {
      alert("Error! Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
};
