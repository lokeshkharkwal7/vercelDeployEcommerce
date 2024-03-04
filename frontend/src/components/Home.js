import React, { useEffect } from "react";
import { fetchProducts } from "../ProjectAPIS/fetchProduct";
// importing products from sample api
// import { products } from "../sampleapi/products";
import ProductCard from "./ProductCard";
// importing middleware
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../ProjectAPIS/fetchUser";
import Navbar from "./Navbar";
import { fetchCartProduct } from "../ProjectAPIS/fetchCart";

function Home({ category = "Electronics" }) {
  const dispatch = useDispatch();

  const authToken = localStorage.getItem("user_auth_token");

  console.log("User token get from the Login page is : ", authToken);

  useEffect(() => {
    fetchProducts(authToken, category, dispatch);
    fetchUser(authToken, dispatch);
    fetchCartProduct(authToken, dispatch);
  }, [category]);

  // Access data from Redux store
  const products = useSelector((state) => {
    return state.fetchProductsSlicerName.data;
  });

  return (
    <div>
      <Navbar />
      <br />
      <br />

      <div className="container-fluid fs-4 text-center bg-primary text-light mt-2">
        <i className="fa-solid fa-layer-group fs-6 mx-2"></i>
        {category}
      </div>
      <div
        className="container-fluid d-flex flex-wrap mt-3"
         
      >
        {products.map((content) => (
          <ProductCard
            key={content.pdescription}
            pname={content.pname}
            pprice={content.pprice}
            pimages={content.pimages}
            pcategory={content.pcategory}
            psubcategory={content.psubcategory}
            ptitle={content.ptitle}
            pdescription={content.pdescription}
            porigin={content.porigin}
            punits={1}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
