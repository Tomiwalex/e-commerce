import React, { lazy, Suspense } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import ProductLoadingDisplay from "../../components/productLoading";
const Products = lazy(() => import("../../components/products"));

const ShopPage = () => {
  const { products } = useGetProducts();

  return (
    <div className=" bg-gray-100 min-h-[calc(100vh-60px)] pb-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4 pt-10 gap-x-3 md:gap-x-5 gap-y-7">
        {products.map((product) => (
          <Suspense fallback={<ProductLoadingDisplay />}>
            <div
              key={product._id}
              className="fadeIn rounded-md overflow-hidden bg-white"
            >
              <Products products={product} />
            </div>
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
