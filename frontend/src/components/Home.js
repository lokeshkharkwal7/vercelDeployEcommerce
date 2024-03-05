import React, { useEffect, useState } from "react";
import { fetchProducts } from "../ProjectAPIS/fetchProduct";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../ProjectAPIS/fetchUser";
import Navbar from "./Navbar";
import { fetchCartProduct } from "../ProjectAPIS/fetchCart";
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";

function Home({ category = "Electronics" }) {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("user_auth_token");

  console.log("User token get from the Login page is : ", authToken);
  const [addToCartStatus, setAddToCarStatus] = useState(false);

  // for showing alert messages when data successfully entered to the cart
  const getAddToCartStatus = (params) => {
    setAddToCarStatus(params);
  };

  // this code will reset the add to cart status to false and since it is messing with the code we have set timeout to 1 sec for perfect execution
  const changeCartStatusToFalse = () => {
    setTimeout(() => {
      setAddToCarStatus(false);
    }, 1000);
  };

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

      {/* using loading */}
      {products.length === 0 ? (
        <div>
          {" "}
          <Loading />{" "}
        </div>
      ) : (
        <div className="container-fluid fs-4 text-center bg-primary text-light mt-2">
          <i className="fa-solid fa-layer-group fs-6 mx-2"></i>
          {category}
        </div>
      )}

      <AlertMessage message={"Welcome Back"} />
      {addToCartStatus === false ? (
        ""
      ) : (
        <div>
          <AlertMessage message={addToCartStatus} />
          {changeCartStatusToFalse()}
        </div>
      )}

      <div className="container-fluid d-flex flex-wrap mt-3">
        {products.map((content) => (
          <ProductCard
            key={content.pdescription}
            addToCartStatus={getAddToCartStatus}
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
