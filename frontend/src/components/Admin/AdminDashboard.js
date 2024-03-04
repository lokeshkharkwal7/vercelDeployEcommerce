import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { fetchSellerProducts } from "../../ProjectAPIS/Admin/fetchProduct";
import AdminProductCard from "./AdminProductCard";
import { addingProductsToDatabase } from "../../ProjectAPIS/Admin/addProducts";

function AdminDashboard() {
  // making state to save the entire seller data that is been fetched from the database
  const [sellerProducts, setSellerProducts] = useState([]);
  //   state for storing form details in a object format
  const [addProductData, setAddProductData] = useState([]);

  const sellerAuthtoken = localStorage.getItem("seller_auth_token");

  useEffect(() => {
    async function fetchProduct() {
      const data = await fetchSellerProducts(sellerAuthtoken);
      setSellerProducts(data);
    }
    fetchProduct();
  }, []);
  const onChange = (e) => {
    setAddProductData({
      ...addProductData,
      [e.target.id]: e.target.value,
    });
    console.log("The value of the data is : ", addProductData);
  };

  //    ADDING THE PRODUCTS TO THE DATABASE
  const clickedAddProductsButton = () => {
    addingProductsToDatabase(addProductData, sellerAuthtoken);
  };

  return (
    <>
      <AdminNavbar />
      <h1 className="text-secondary text-center       py-2 ">
        <i className="fa-solid fa-cart-plus mx-4"></i> Add Products
      </h1>
      <div
        className="container mt-3 bg-danger px-3 py-3 text-light"
        style={{ borderRadius: "20%" }}
      >
        <div className="container px-5 py-5 ">
          <form>
            <div className="mb-3">
              <label htmlFor="pname" className="form-label">
                Product Name
              </label>
              <input
                onChange={onChange}
                style={{ maxWidth: "100%" }}
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
                style={{ maxWidth: "100%" }}
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
                style={{ maxWidth: "100%" }}
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
                style={{ maxWidth: "100%" }}
                type="text"
                className="form-control text-dark"
                id="pcategory"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="psubcategory" className="form-label">
                Product Subcategory
              </label>
              <input
                onChange={onChange}
                style={{ maxWidth: "100%" }}
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
                style={{ maxWidth: "100%" }}
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
                style={{ maxWidth: "100%" }}
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
                style={{ maxWidth: "100%" }}
                type="text"
                className="form-control text-dark"
                id="porigin"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                onChange={onChange}
                style={{ maxWidth: "100%" }}
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <div className="text-center">
              <button
                className="btn btn-danger fs-3"
                onClick={clickedAddProductsButton}
              >
                <i class="fa-solid fa-plus"></i> Add Product
              </button>
            </div>
          </form>
        </div>
      </div>

      <h1 className="text-center mt-2 text-secondary mb-5 mt-4">
        <i className="fa-regular fa-rectangle-list"></i> Your Products
      </h1>

      <div className="container-fluid d-flex flex-wrap">
 
        {sellerProducts.map((object,index) => {
          return (
            <AdminProductCard
              key = {object.pname + index}
              name={object.pname}
              images={object.pimages}
              price={object.pprice}
              pdescription={object.pdescription}
            />
          );
        })}
      </div>
    </>
  );
}

export default AdminDashboard;
