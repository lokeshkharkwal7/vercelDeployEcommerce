import React, { useState } from "react";
// use history is not working
// so using usenavigate
import { useNavigate } from "react-router-dom";

import notepicture from "../photos/UserLogin.png";
import adminImage from "../photos/adminLogin.png";
import { useDispatch } from "react-redux";
import { fetchUser } from "../ProjectAPIS/fetchUser";
import { fetchSeller } from "../ProjectAPIS/fetchSeller";
function Login() {
  const [user, setUser] = useState("customer");
  const clickedAdmin = () => {
    user === "customer" ? setUser("admin") : setUser("customer");
  };

  const dispatch = useDispatch();
  // getting the text which is inside the text box
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [admincredentials, setAdmincredentials] = useState({
    adminemail: "",
    adminpassword: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setCredentials({
      //MOST USED SYNTAX TO STORE THE FORM INFOMATION
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // taking input from admin form
  const onChangeadmin = (e) => {
    e.preventDefault();
    setAdmincredentials({
      //MOST USED SYNTAX TO STORE THE FORM INFOMATION
      ...admincredentials,
      [e.target.name]: e.target.value,
    });
  };

  let navigate = useNavigate();

  const host = "http://localhost:4000";

  // AUTHENTICATING ADMIN

  const onSubmitAdmin = async (e) => {
    e.preventDefault();
    const { adminemail, adminpassword } = admincredentials;
    console.log("creddentials are : ", admincredentials);
    try {
      const response = await fetch(`${host}/seller/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ semail: adminemail, spassword: adminpassword }), // body data type must match "Content-Type" header
      });

      if (response.ok) {
        const auth_token = await response.json(); // parses JSON response into native JavaScript objects
        console.log("response from the adminlogin is : ", auth_token);
        // changeAuthToken(auth_token);

        if (auth_token.status === true) {
          localStorage.setItem("seller_auth_token", auth_token.authToken);
          console.log(
            "auth_token extracted",
            localStorage.getItem("seller_auth_token")
          );
          // ASSIGNIG NEW AUTH TOKEN TO THE LOCAL STORAGE
          /*****************  */
          // CALLING FETCHUSER TO FETCH THE USER FROM THE AUTH TOKEN
          const authTokenSeller = localStorage.getItem("seller_auth_token");
          const status = await fetchSeller(authTokenSeller);
          if (status) {
            navigate("/seller/home"); //CHANGE TO DIFFERENT ROUTE
          }

          //   window.location.reload();                        ONLY IF NECESSARY
          //   console.log("Reload done in login page");
        } else {
          alert("Invalid credentials");
        }
      } else {
        console.log("Response from the server is :", response);
      }
    } catch (error) {
      console.log("Error from try block : ", error);

      alert("Invalid credentials");
    }
  };

  // AUTHENTICATING USER

  const onSubmitUser = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    try {
      const response = await fetch(`${host}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
      });

      if (response.ok) {
        const auth_token = await response.json(); // parses JSON response into native JavaScript objects
        // changeAuthToken(auth_token);

        if (auth_token.status === true) {
          localStorage.setItem("user_auth_token", auth_token.authToken);
          console.log(
            "auth_token extracted",
            localStorage.getItem("user_auth_token")
          );
          // ASSIGNIG NEW AUTH TOKEN TO THE LOCAL STORAGE
          const authToken = localStorage.getItem("user_auth_token");
          // CALLING FETCHUSER TO FETCH THE USER FROM THE AUTH TOKEN
          fetchUser(authToken, dispatch);
          // ToastMessage("Success", `Welcome ${email} `);

          // alert(`Welcome ${email} `);
          navigate("/products/category/Electronics"); //CHANGE TO DIFFERENT ROUTE
          console.log(
            "loginpage : we have reloded the page after navigating to home"
          );
          //   window.location.reload();                        ONLY IF NECESSARY
          //   console.log("Reload done in login page");
        } else {
          alert("Invalid credentials");
        }
      } else {
        console.log("Response from the server is :", response);
      }
    } catch (error) {
      console.log("Error from try block : ", error);

      alert("Invalid credentials");
    }
  };

  // creating an Onclick function which will fetch the api and will get us a authentication token
  return (
    <>
      {user === "customer" ? (
        <div className="container mt-5">
          <button
            type="button"
            className="btn btn-danger float-end mt-2"
            onClick={clickedAdmin}
          >
            I'm Admin <i class="fa-solid fa-user-tie mx-2"></i>
          </button>
          <br></br>
          <div className="row">
            {/* Image Column */}
            <div className="col-md-4 mb-4">
              <img
                src={notepicture}
                className="img-fluid"
                style={{ maxWidth: "100%" }}
                alt="..."
              />
            </div>

            {/* Form Column */}
            <div className="col-md-8">
              <div className="container">
                <h2 className="display-1 fs-1">Sign In</h2>
                <form>
                  <div className="mb-3 my-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={onChange}
                      name="email"
                      id="email"
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={onChange}
                      name="password"
                      id="password"
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      I agree the policies
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    onClick={onSubmitUser}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // if authentication user is Admin

        <div className="container-fluid mt-5 bg-danger text-light ">
          <button
            type="button"
            className="btn btn-round btn-light float-end mt-2"
            onClick={clickedAdmin}
          >
            I'm User <i class="fa-regular fa-user"></i>
          </button>
          <br></br>
          <div className="row">
            {/* Image Column */}
            <div className="col-md-4 mb-4">
              <img
                src={adminImage}
                className="img-fluid"
                style={{ maxWidth: "100%" }}
                alt="..."
              />
            </div>

            {/* Form Column */}
            <div className="col-md-8">
              <div className="container">
                <h2 className="display-1 fs-1">Admin Sign In</h2>
                <form>
                  <div className="mb-3 my-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={onChangeadmin}
                      name="adminemail"
                      id="adminemail"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={onChangeadmin}
                      name="adminpassword"
                      id="adminpassword"
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      I agree the policies
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-light mt-4"
                    onClick={onSubmitAdmin}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
