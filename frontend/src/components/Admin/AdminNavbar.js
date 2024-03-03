import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  // for Admin Log out
  const navigate = useNavigate();
  const adminLogOut = () => {
    localStorage.setItem("seller_auth_token", null);
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Admin
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link  text-decoration-none"
                  aria-current="page"
                  to="/seller/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/seller/productdashboard">
                  Product DashBoard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/seller/products/Electronics">
                  All Products
                </Link>
              </li>
            </ul>
            <button type="button" class="btn btn-light mx-2">
              <button
                className="text-dark text-decoration-none"
                onClick={adminLogOut}
              >
                {" "}
                <i class="fa-solid fa-right-from-bracket mx-2"></i>
                EXIT
              </button>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavbar;
