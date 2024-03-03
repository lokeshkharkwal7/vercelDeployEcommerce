import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { editAdminProduct } from "../../ProjectAPIS/Admin/editProduct";
import { useNavigate } from "react-router-dom";

function AdminEditProduct({
  pname,
  pprice,
  pimages,
  pcategory,
  psubcategory,
  ptitle,
  pdescription,
  porigin,
}) {
  // state for saving input data from the form
  const [addProductData, setAddProductData] = useState([]);
  const navigate = useNavigate();

  const sellerAuthtoken = localStorage.getItem("seller_auth_token");
  //   product information that will be about to edit
  let productInLocalStorageForEdit = localStorage.getItem(
    "product_name_to_edit"
  );
  const productInfoforEdit = JSON.parse(productInLocalStorageForEdit);

  const onChange = (e) => {
    setAddProductData({
      ...addProductData,
      [e.target.id]: e.target.value,
    });
    console.log("The value of the data is : ", addProductData);
  };
  const clickedOnButton = () => {
    console.log("value inside the local storage is : ", productInfoforEdit);
  };

  const clickedEditProduct = () => {
    console.log(
      "product name that is about to change : ",
      productInfoforEdit.pname
    );
    console.log("Updated info : ", addProductData);

    editAdminProduct(productInfoforEdit.pname, addProductData, sellerAuthtoken);
    // navigate to product page for reflecting changes 
    navigate(`/seller/products/${productInfoforEdit.pcategory}`);
  };

  return (
    <>
      <AdminNavbar />

      <div className="container-fluid bg-danger  align-middle py-4">
        <h1 className="text-light text-center mb-4 mx-2 ">
          Edit <i className="fa-regular fa-pen-to-square"></i>{" "}
          {productInfoforEdit.pname}
        </h1>

        <form>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="pname" className="form-label">
                  Product Name
                </label>
                <input
                  onChange={onChange}
                  placeholder={productInfoforEdit.pname}
                  style={{ maxWidth: "70%" }}
                  type="text"
                  className="form-control text-dark"
                  id="pname"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pprice" className="form-label">
                  Product Price
                </label>
                <input
                  onChange={onChange}
                  placeholder={productInfoforEdit.pprice}
                  style={{ maxWidth: "70%" }}
                  type="number"
                  className="form-control text-dark"
                  id="pprice"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pimages" className="form-label">
                  Product Image
                </label>
                <input
                  onChange={onChange}
                  placeholder={productInfoforEdit.pimages}
                  style={{ maxWidth: "70%" }}
                  type="text"
                  className="form-control text-dark"
                  id="pimages"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pcategory" className="form-label">
                  Product Category
                </label>
                <input
                  onChange={onChange}
                  placeholder={productInfoforEdit.pcategory}
                  style={{ maxWidth: "70%" }}
                  type="text"
                  className="form-control text-dark"
                  id="pcategory"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="psubcategory" className="form-label">
                  Product Subcategory
                </label>
                <input
                  onChange={onChange}
                  placeholder={productInfoforEdit.psubcategory}
                  style={{ maxWidth: "70%" }}
                  type="text"
                  className="form-control text-dark"
                  id="psubcategory"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ptitle" className="form-label">
                  Product Title Line
                </label>
                <input
                  onChange={onChange}
                  placeholder={productInfoforEdit.ptitle}
                  style={{ maxWidth: "70%" }}
                  type="text"
                  className="form-control text-dark"
                  id="ptitle"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pdescription" className="form-label">
                  Product Description
                </label>
                <input
                  onChange={onChange}
                  placeholder={productInfoforEdit.pdescription}
                  style={{ maxWidth: "70%" }}
                  type="text"
                  className="form-control text-dark"
                  id="pdescription"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="porigin" className="form-label">
                  State Origin
                </label>
                <input
                  onChange={onChange}
                  placeholder={productInfoforEdit.porigin}
                  style={{ maxWidth: "70%" }}
                  type="text"
                  className="form-control text-dark"
                  id="porigin"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  onChange={onChange}
                  style={{ maxWidth: "70%" }}
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>
            </div>
          </div>
        </form>

        <div className="bg-danger mb-4">
          <div className="text-center ">
            <button
              className="btn btn-light fs-3"
              onClick={clickedEditProduct}
              style={{ borderRadius: "5%" }}
            >
              <i className="fa-solid fa-pen-nib"></i> Update Product
            </button>{" "}
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminEditProduct;
