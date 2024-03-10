import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartPhoto from "../photos/cart.png";
import { removeFromCart } from "../redux/slicers/cartSlicer";
import { addDataToCartMongoDB } from "../ProjectAPIS/cartAddMongo.js";
import Navbar from "./Navbar";
import { cartDeleteEverything } from "../ProjectAPIS/cartDeleteEverything.js";
import removeElementFromCartMongoDB from "../ProjectAPIS/cartDeleteMongo.js";
import { fetchCartProduct } from "../ProjectAPIS/fetchCart.js";

function Cart() {
  const dispatch = useDispatch();
  const cartElements = useSelector((state) => {
    return state.cartSlicerName;
  });
  // MAKING THE CART EMPTY IN THE DATABASE
  const userdetailJSON = localStorage.getItem("userDataFromToken");
  const authToken = localStorage.getItem("user_auth_token");
  const userinfo = JSON.parse(userdetailJSON);
  // # changes made
  // cartDeleteEverything(userinfo._id);  (Commented this line)
  // THIS FUNCTION WILL ADD ALL THE INFORMATION OF THE CURRENT REDUX STATE OF CART TO MONGODB SERVER
  // addDataToCartMongoDB(cartElements);  (Commented this line )

  const clickedOnButton = () => {
    console.log("Cart array is : ", cartElements);
  };

  // REMOVING ALL THE DATA THAT IS ALREADY PRESEND IN THE DATABASE
  // removeElementFromCartMongoDB(cartElements[0].userId)

  // ADDING ALL THIS CART DATA TO MONGODB DATABASE if the length is not empty removing the mongo db data and adding a new one
  //   cartElements.length===0 ?
  //   removeElementFromCartMongoDB(cartElements[0].userId)
  //  : console.log("Array is empty")
  //  cartElements.length===0 ?
  //   addDataToCartMongoDB(cartElements[0].userId)
  //  : console.log("Array is empty")

  // const totalItem = cartElements.length; This is not giving right result
  // so we are using units that are present inside the carts to find total sum
  // THE LOGICS ARE TO FIND OUT THE TOTAL BILL AND TOTAL ITEMA
  const totalItem = cartElements.reduce((accumulator, objects) => {
    return accumulator + Number(objects.punits);
  }, 0);
  const totalBill = cartElements
    .reduce((accumulator, objects) => {
      return accumulator + Number(objects.pprice);
    }, 0)
    .toFixed(2); // here 0 is the initital value of the accumulator

  // REMOVE FROM CART BUTTON CLICKED HERE IT IS THE ICON
  const clickedRemoveFromCart = (pdescription) => {
    dispatch(removeFromCart(pdescription));
    console.log("Going to remove the cart item from mongo db ");
    // CALLING BOTH OF OUR FUNCTION TO DELETE AND ADD THE CART IN MONGODB
    // removeElementFromCartMongoDB(cartElements[0].userId)
    removeElementFromCartMongoDB(pdescription);
    console.log("Cart item successfully removed");

    console.log("Eement after deletion from the cart : ", cartElements);
    console.log("Value of the pdescription is : ", pdescription);
  };

  useEffect(() => {
    // getting the data of the cart from the mongo db

    fetchCartProduct(authToken, dispatch);

    // saving the info to the redux state
  }, []);

  return (
    <>
      {" "}
      <Navbar />
      <div className="container-fluid mt-5 bg-primary text-light overflow-auto">
        <br />
        <p className="fs-2 text-center ">
          Shopping Cart <i className="fa-solid fa-cart-shopping"></i>{" "}
        </p>

        <div className="container-fluid">
          <div className="row">
            {/* Render Cart Elements */}

            <div className="col">
              <div className="container-fluid">
                <p className="fs-3 text-center">
                  <i class="fa-solid fa-list-ul"></i> Items
                </p>
                {cartElements.map((cartElement) => (
                  <div
                    key={cartElement.pdescription} // Ensure each element has a unique key
                    className="overflow-auto container-fluid text-dark px-2"
                    style={{ fontSize: "small" }}
                  >
                    <div
                      className="card mb-3"
                      style={{
                        maxWidth: 500,
                        maxHeight: 140,
                        borderRadius: "2%",
                      }}
                    >
                      <div className="row g-0">
                        <div className="col-md-3">
                          {/* there is the img tag  */}
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <button className="btn btn-success px-1 py-0">
                              x{cartElement.punits}
                            </button>
                            <h5 className="card-title">{cartElement.pname} </h5>

                            <p className="card-title">
                              {cartElement.ptitle}
                              <button
                                className="btn-fluid btn-danger  mx-4"
                                onClick={() => {
                                  clickedRemoveFromCart(
                                    cartElement.pdescription
                                  );
                                }}
                              >
                                <i className="fa-solid fa-xmark"></i>{" "}
                              </button>
                            </p>
                            <p className="card-text">Rs {cartElement.pprice}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Render Other Cart Content */}
            <div className="col">
              <p className="fs-3 text-center"></p>
              <div
                className="card mb-3 text-dark"
                style={{
                  maxWidth: 900,
                  maxHeight: 1000,
                  fontSize: "large",
                  borderRadius: "5%",
                }}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      align="left"
                      src={cartPhoto}
                      className="img-fluid rounded-start "
                      alt="..."
                      style={{
                        maxHeight: 500,
                        maxWidth: 320,

                        display: "grid",

                        marginTop: "2rem",
                      }}
                    />
                  </div>
                  <div className="col-md-8  ">
                    <div className="card-body">
                      <h5 className="card-title mt-4   fs-2 mx-5">
                        Total Bill
                      </h5>
                    </div>
                    <p className="mx-5  fs-3">
                      Tottal Item{" "}
                      <button className="btn-infod text-dark mx-2">
                        {totalItem}
                      </button>
                      <br></br>
                    </p>
                    <p className="mx-5   fs-3 ">
                      Tottal Bill{" "}
                      <button className="btn-infos text-dark mx-2 ">
                        Rs {totalBill}
                      </button>
                      <br></br>
                    </p>
                    <br />
                    <button className="btn-success display-2  fs-3 px-4 py-2 mx-5 mb-4">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;

// HOW i BUILD MY CART COMPONENT

// FIRST OF ALL THE I HAVE USED REDUX TOOLKIT TO ENTER THE CART DATA DIRECTLY TO THE STORE INITIAL STATE AND THEN
// WHEN THE USER WILL CLICK ON THE CART BUTTON THE ENTIRE MONGO DB DATA FOR THE SPECIFIC USER ID WILL GET DELETED
// AND NEW REDUX DATA THAT IS IN THE TEMPERORY BASIS WILL INSERT BACK TO THE DATABASE ENSUREING THERE IS THE LESS
// LOAD IN THE CART COMPONENT
