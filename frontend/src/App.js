import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import Login from "./components/Login";
import Cart from "./components/Cart";
import { useEffect } from "react";
import { fetchUser } from "./ProjectAPIS/fetchUser";
import { useDispatch } from "react-redux";
import UserInfo from "./components/UserInfo";
import AdminHome from "./components/Admin/AdminHome";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminEditProduct from "./components/Admin/AdminEditProduct";
function App() {
  const categories = [
    "Electronics",
    "Clothing",
    "Furniture",
    "Fitness",
    "Fashion",
    "Footwear",
    "Home and Kitchen",
  ];

  const dispatch = useDispatch();
  const authToken = localStorage.getItem("user_auth_token");

  useEffect(() => {
    if (authToken !== null) {
      fetchUser(authToken, dispatch);
      console.log("Use Effect of app.js is called : ", authToken);
    } else {
      console.log("Auth is Null cannot continue");
    }
  }, []);

  return (
    <BrowserRouter>
      <>
        <Routes>
          {/* FOR LOGIN  */}
          <Route path={`/`} element={<Login />} />
          {/* FOR GETTING PRODUCTS VIA CATEGORY  */}
          {categories.map((category) => {
            return (
              <Route
                path={`/products/category/${category}`}
                element={<Home category={`${category}`} />}
              />
            );
          })}
          {/* FOR CART  */}
          <Route path={`/user/cart`} element={<Cart />} />
          {/* FOR FETCHING USER INFO  */}
          <Route path={`/user/userinfo`} element={<UserInfo />} />
          {/* Routes for admin page  */}
          <Route path={`/seller/home`} element={<AdminHome />} />
          {/* Routes for admin page  */}
          <Route path={`/seller/productdashboard`} element={<AdminDashboard/>} />
          {/* Routes for admin page  */}
          <Route path={`/seller/sellerproducts`} element={<AdminProducts/>} />

          {/* For Admin Products  */}

          {categories.map((category) => {
            return (
              <Route
                path={`/seller/products/${category}`}
                element={<AdminProducts category={`${category}`} />}
              />
            );
          })}

          {/* Routes for edit products in admin page dashboard  */}
          <Route path={`/seller/products/toedit`} element={<AdminEditProduct/>
} />


        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
