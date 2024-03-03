import React, { useEffect, useRef, useState } from "react";
import adminImage from "../../photos/adminWelcome.png";
import AdminNavbar from "./AdminNavbar";
import { fetchSeller } from "../../ProjectAPIS/fetchSeller";
function AdminHome() {
  const sellerDataJSON = localStorage.getItem("sellerDetails");
  const sellerData = JSON.parse(sellerDataJSON);
  // useEffect(() => {
  //   // CALLING FETCHUSER TO FETCH THE USER FROM THE AUTH TOKEN
  //   const authTokenSeller = localStorage.getItem("seller_auth_token");
  //   fetchSeller(authTokenSeller);
  // }, []);

  return (
    <>
      <div className="bg-danger">
        <AdminNavbar />
        <div className="d-flex mt-2  ">
          <div
            className="card bg-danger text-light"
            style={{ maxWidth: "1000px" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={adminImage}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title fs-1">Welcome! </h5>
                  <h5 className="card-title fs-1">{sellerData.sname} !</h5>{" "}
                  <br />
                  <p className="card-text">
                    I have the capability to seamlessly handle various tasks,
                    including adding new products and updating existing ones.
                    Additionally, I possess the functionality to manage and
                    update user passwords securely. With this versatility, I
                    ensure a robust and comprehensive solution for product
                    management and user security, guaranteeing a smooth and
                    reliable experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card border-light bg-danger mb-3"
        style={{ maxWidth: "50%" }}
      >
        <div className="card-header bg-light">
          <h5 className="card-title text-center fs-3">
            <i className="fa-regular fa-address-card mx-2"></i> Admin Info
          </h5>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Name:</b> {sellerData.sname}
            </li>
            <li className="list-group-item">
              <b>Email:</b> {sellerData.semail}
            </li>
            <li className="list-group-item">
              <b>Card Number:</b> {sellerData.scard}
            </li>
            <li className="list-group-item">
              <b>Phone Number:</b> {sellerData.sphonenumber}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
