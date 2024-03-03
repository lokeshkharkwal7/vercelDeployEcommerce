import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminEditProduct from "./AdminEditProduct";
import ProductCard from "../ProductCard";
import { deleteSellerProduct } from "../../ProjectAPIS/Admin/deleteProduct";
import { useDispatch } from "react-redux";

function AdminProductEditCard({
  pname,
  pimages,
  ptitle,
  pdescription,
  pcategory,
  pprice,
  psubcategory,
  porigin,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authTokenSeller = localStorage.getItem("seller_auth_token");

  let productData = {
    pname: pname,
    pimages: pimages,
    ptitle: ptitle,
    pdescription: pdescription,
    pcategory: pcategory,
    pprice: pprice,
    psubcategory: psubcategory,
    porigin: porigin,
  };
  // converting object to string using stringify so that we can store it in the local storage
  productData = JSON.stringify(productData);
  const ClickedEdit = () => {
    localStorage.setItem("product_name_to_edit", productData);
    const data = localStorage.getItem("product_name_to_edit");
    console.log(
      "The value of the data which  is inside the local storage is : ",
      data
    );

    navigate(`/seller/products/toedit`);
  };

  const ClickDelete = () => {
    // API Call for Deletion
    try {
      deleteSellerProduct(pname, authTokenSeller, dispatch);
    } catch (error) {
      console.log(
        "Error found whiile calliing api of deletesellerproduct : ",
        error
      );
    }
    // navigate("/seller/products/Electronics")
  };

  return (
    <div>
      <div
        className="card-fluid text-secondary bg-light mx-3 "
        style={{ width: "15rem" }}
      >
        <img src={pimages} className="card-img-top img-responsive" alt="..." />
        <div className="card-body">
          <h5 className="container-fluid  card-title    fs-5">{pname}</h5>

          <h5 className="card-title  fs-6">{ptitle}</h5>
          <p className="card-text fs-6 text-secondary  ">{pdescription}</p>
          <p className="card-text fs-6 mx-1">
            <i className="fa-solid fa-list"></i> {pcategory} Rs {pprice}
          </p>

          <button className="btn btn-danger mx-2" onClick={ClickDelete}>
            Delete <i className="fa-solid fa-trash-can"></i>
          </button>
          <button className="btn btn-danger mx-2" onClick={ClickedEdit}>
            Edit <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProductEditCard;
