import React from "react";
import { useSelector } from "react-redux";
import userImage from "../photos/login.png";
import Navbar from "./Navbar";

function UserInfo() {
  const userInfoJSONFormat = localStorage.getItem("userDataFromToken")
  const userInfo = JSON.parse(userInfoJSONFormat)

  return (
    <>
      {" "}
      <Navbar />
      <div
        className="card mb-3 mt-5 bg-primary text-light"
        style={{ maxWidth: "100rem" }}
      >
        <br />
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={userImage}
              className="img-fluid rounded-start"
              alt="User"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title mb-0 fs-1 ">{userInfo.name}</h1>
              <p className="card-text text-light fs-3">
                <small>{userInfo.email}</small>
              </p>
              <hr className="my-2" />
              <p className="card-text fs-6">
                <strong>City:</strong> {userInfo.city}
              </p>
              <p className="card-text fs-6">
                <strong>Address:</strong> {userInfo.address}
              </p>
              <p className="card-text fs-6">
                <strong>Card:</strong> {userInfo.card}
              </p>
              <p className="card-text fs-6">
                <strong>Gender:</strong> {userInfo.gender}
              </p>
              <p className="card-text fs-6">
                <strong>State:</strong> {userInfo.state}
              </p>
              <p className="card-text fs-6">
                <strong>Phone Number:</strong> {userInfo.phonenumber}
              </p>
              <p className="card-text fs-6">
                <strong>Pincode:</strong> {userInfo.pincode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserInfo;

// ERROR WHILE COMPLETING :
// 1. always store the user info to the local storage because whenever you refresh the page
// the redux store will be remounted and its value and all the content will be disapper
