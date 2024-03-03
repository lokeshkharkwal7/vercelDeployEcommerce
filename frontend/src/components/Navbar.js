import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, json } from "react-router-dom";
import { fetchUser } from "../ProjectAPIS/fetchUser";
import { deleteUserData } from "../redux/slicers/fetchUserInfo";

function Navbar() {
  const categories = [
    "Electronics",
    "Clothing",
    "Furniture",
    "Fitness",
    "Fashion",
    "Footwear",
    "Home and Kitchen",
  ];

  // const userData = useSelector((state) => {
  //   return state.UserInfoSlicer; // this will get all the information about the users
  // });
  // const userInfo = userData[0];

  const userDataFromLocalStorageInJSONFormat =
    localStorage.getItem("userDataFromToken");
  const userinfo = JSON.parse(userDataFromLocalStorageInJSONFormat);

  const clickeduserinfo = () => {
    console.log("value of Users from the local storage are : ", userinfo.name);
  };

  const clickedLoggedOut = (params) => {
    localStorage.setItem("user_auth_token", null);

    console.log(
      "After logged out and deletion the value of the slicer initial is : "
    );
  };
  // FOR THE CART BUTTON ONLY
  const cartElements = useSelector((state) => {
    return state.cartSlicerName; // TAKING CARTELEMTNS FROM REDUX STORE
  });
  // LENGTH IS NOT GIVING GOOD OUTPUT SO WE HAVE REPLACED WITH TOTAL UNITS THAT ARE PRESENT INSIDE THE CARTSLICER IN REDUX STORE
  // const totalItem = cartElements.length; // FINDING LENGTH
  const totalItem = cartElements.reduce((accumulator, objects) => {
    return accumulator + Number(objects.punits);
  }, 0);
  const totalBill = cartElements
    .reduce((accumulator, objects) => {
      //FINDING TOTAL PRICE OF THE ITEMS
      return accumulator + Number(objects.pprice);
    }, 0)
    .toFixed(2); // here 0 is the initital value of the accumulator
  // const authToken = localStorage.getItem("user_auth_token");
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   fetchUser(authToken, dispatch);
  //   console.log("Use Effect of app.js is called : ", authToken);
  // }, []);
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Wiz Store{" "}
              <i className="fa-solid fa-store mx-1"></i>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/products/category/Electronics"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </a>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {categories.map((category) => {
                      return (
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/products/category/${category}`}
                          >
                            {category}
                          </Link>
                        </li>
                      );
                    })}

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <button
                className="btn btn-primary mx-3"
                onClick={clickeduserinfo}
              >
                {" "}
                {/* {userInfo[0].name} */}
                <Link className="btn btn-primary" to="/user/userinfo">
                  <i class="fa-regular fa-user mx-2"></i>
                  {userinfo.name}{" "}
                </Link>
              </button>
              <button className="btn btn-light">
                {" "}
                <i class="fa-solid fa-list"></i> {totalItem}{" "}
              </button>
              <Link to="/user/cart">
                <button type="button" className="btn btn-light mx-3">
                  <i className="fa-solid fa-cart-shopping mx-2"></i>
                  Rs {totalBill}
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-primary"
                onClick={clickedLoggedOut}
              >
                <Link
                  className="text-light"
                  style={{ textDecoration: "none" }}
                  to="/"
                >
                  <i className="fa-solid fa-right-from-bracket"></i> LogOut
                </Link>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;

// ERRORS   // LENGTH IS NOT GIVING GOOD OUTPUT cartElements.length SO WE HAVE REPLACED WITH TOTAL UNITS THAT ARE PRESENT INSIDE THE CARTSLICER IN REDUX STORE
