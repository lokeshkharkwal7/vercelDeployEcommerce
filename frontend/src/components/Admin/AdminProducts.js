// This page will be dispalaying all the products that have been uploaded by the admin

import React, { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import AdminProductEditCard from "./AdminProductEditCard";
import { fetchSellerProductsbyCategory } from "../../ProjectAPIS/Admin/fetchProductCategory";
import { Link } from "react-router-dom";

function AdminProducts({ category }) {
  const sellerAuthToken = localStorage.getItem("seller_auth_token");
  const dispatch = useDispatch();

  // getting the data from the redux store
  const productSellerBYCategory = useSelector((state) => {
    return state.fetchProductSellerCategoryName.data;
  });
  console.log("Value of category inside the adminproduct is : ", category);

  useEffect(() => {
    //   this function will perfom api call and send all the data to the redux store for easy state managerment
    fetchSellerProductsbyCategory(sellerAuthToken, category, dispatch);
  }, [category]);
  return (
    <>
      <AdminNavbar />

      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        {/* ... (unchanged code) */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className="nav-link  "
              aria-current="page"
              to="/seller/products/Electronics"
            >
              Home
            </Link>
          </li>

          {/* New category links with React Router */}
          <li className="nav-item">
            <Link className="nav-link" to="/seller/products/Electronics">
              Electronics
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/seller/products/Clothing">
              Clothing
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/seller/products/Furniture">
              Furniture
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/seller/products/Fitness">
              Fitness
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/seller/products/Fashion">
              Fashion
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/seller/products/Footwear">
              Footwear
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/seller/products/Home and Kitchen">
              Home and Kitchen
            </Link>
          </li>
          {/* ... (unchanged disabled item) */}
        </ul>
        {/* ... (unchanged form) */}
      </nav>

      <h1 className="text-center text-secondary my-2"> Your All Products</h1>

      <div className="container-fluid d-flex flex-wrap mt-1 ">
        {productSellerBYCategory.length === 0 ? (
          <div className="text-center">
            <h1 className="Display-1 text-danger">
              <i className="fa-solid fa-temperature-empty"></i> No Products To
              Display ...
            </h1>
          </div>
        ) : (
          productSellerBYCategory.map((object, index) => {
            return (
              <AdminProductEditCard
                key={object.pname + index}
                pname={object.pname}
                pimages={object.pimages}
                ptitle={object.ptitle}
                pdescription={object.pdescription}
                pprice={object.pprice}
                pcategory={object.pcategory}
                psubcategory={object.psubcategory}
                porigin={object.porigin}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default AdminProducts;
