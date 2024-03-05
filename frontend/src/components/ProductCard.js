import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slicers/cartSlicer";
import { useNavigate } from "react-router-dom";
import { addDataToCartMongoDB } from "../ProjectAPIS/cartAddMongo";
import { removeElementFromCartMongoDB } from "../ProjectAPIS/cartDeleteMongo";
import Navbar from "./Navbar";
import AlertMessage from "./AlertMessage";

function ProductCard({
  addToCartStatus,
  
  pname,
  pprice,
  pimages,
  pcategory,
  psubcategory,
  ptitle,
  pdescription,
  porigin,
  punits,
}) {
  const dispatch = useDispatch();
  const cartdata = useSelector((state) => {
    return state.cartSlicerName; // THIS WILL GO DIRECTLY TO THE STORE AND RETURN THE STATE
  });
   
  const navigate = useNavigate();
  const clickedAddtoCart = () => {
    addToCartStatus(`${pname} added to Cart Successfully`)
    
    // this function will add the info to the redux store which is made from cart and later we can view it on
    // another component
    const userdetailJSON = localStorage.getItem("userDataFromToken");
    const userinfo = JSON.parse(userdetailJSON);
    const cartItems = {
      userId: userinfo._id,
      pname: pname,
      pprice: pprice,
      pimages: pimages,
      pcategory: pcategory,
      psubcategory: psubcategory,
      ptitle: ptitle,
      pdescription: pdescription,
      porigin: porigin,
      punits: punits,
    };

    // adding the cart items to the database

    // checking if data is already present inside the cart or not
    // if yes than add quantity to 2
    // if no than add quantity to 0

    // we are using description as a unique identifier
    // cardata is from the redux store
    let processcompleted = 0;
    // checking if any repeated values are present in the car data if yes then we will remove it
    for (let i = 0; i < cartdata.length; i++) {
      if (cartdata[i].pdescription === cartItems.pdescription) {
        //  CALLING removeFromCart AND PASS THE DESCRIPTION
        dispatch(removeFromCart(cartItems.pdescription));
        //REMOVING FROM MONGODB ITESELF
        // removeElementFromCartMongoDB(cartItems.pdescription)

        cartItems.punits = cartdata[i].punits + 1;
        //  got an error punit 2 so fixing it dynamically
        if (cartItems.punits === 2) {
          cartItems.pprice = 2 * cartItems.pprice;
          cartItems.punits = 2;
          dispatch(addToCart(cartItems));
          // removeElementFromCartMongoDB(cartItems.pdescription)

          processcompleted = 1;
          break;
        }
        cartItems.pprice = cartdata[i].punits * cartItems.pprice;
        //  ADDING DATA TO REDUX STORE
        dispatch(addToCart(cartItems));
        // ADDING DATA TO MONGO DB
        // let datatoMongo = [cartItems]
        // addDataToCartMongoDB(datatoMongo[0])

        processcompleted = 1;
        break;
      } else {
        processcompleted = 0;
      }
    }
    if (processcompleted === 0) {
      dispatch(addToCart(cartItems)); // ADDING THE CART DATA TO THE ACTION
      // ADDING CART DATA TO MONGO DB
      // let datatoMongo = [cartItems]
      // addDataToCartMongoDB(datatoMongo[0])
    }

    console.log("Data inside the cart is : ", cartdata);
    console.log(
      "Value of user id token : ",
      localStorage.getItem("user_auth_token")
    );
  };

  return (
    <div>
      
      <div className="card-fluid mx-3 my-2" style={{ width: "20rem" }}>
        <img
          src={pimages}
          className="card-img-top img-responsive"
          alt="..."
          style={{ borderRadius: "5%" }}
          // style={{ width: "17vw", height: "35vh", borderRadius: "1%" }}
        />
        <div className="card-body">
          <h5 className="container-fluid  card-title    fs-5">{pname}</h5>

          <h5 className="card-title  fs-6">{ptitle}</h5>
          <p className="card-text fs-6 text-secondary  ">{pdescription}</p>
          <p className="card-text fs-6">Category {pcategory}</p>
          {/* <p className="card-text fs-6">Product Origin {porigin}</p> */}

          <div className="btn btn-primary">
            Rs {"  "}
            {pprice}
          </div>

          <button className="btn btn-primary mx-2" onClick={clickedAddtoCart}>
            <i className="fa-solid fa-cart-shopping"></i> Tocart
          </button>
        </div>
      </div>
        
    </div>
  );
}

export default ProductCard;
