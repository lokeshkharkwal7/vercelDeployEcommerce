import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import AlertMessage from "./AlertMessage";

function ShowSearchedData() {
  // importing search text and searched data from the redux
  const searchResultArray = useSelector((state) => {
    return state.fetchSearchProductSlicer.data;
  });

  const searchedText = useSelector((state) => {
    return state.fetchSearchProductSlicer.searchedText;
  });

  //   for adding cart functionality
  const [addToCartStatus, setAddToCarStatus] = useState(false);

  // for showing alert messages when data successfully entered to the cart
  const getAddToCartStatus = (params) => {
    setAddToCarStatus(params);
  };
  // this code will reset the add to cart status to false and since it is messing with the code we have set timeout to 1 sec for perfect execution
  const changeCartStatusToFalse = () => {
    setTimeout(() => {
      setAddToCarStatus(false);
    }, 1000);
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <br />

      <AlertMessage message={"Search Initiated"} />
      {addToCartStatus === false ? (
        ""
      ) : (
        <div>
          <AlertMessage message={addToCartStatus} />
          {changeCartStatusToFalse()}
        </div>
      )}

      <h2 className="display-1  fs-1 mt-5 mb-3 text-center text-secondary">
        {" "}
        <p className="mx-1">
          <i className="fa-solid fa-list mx-3"></i>
          {/* logic that will show 0 if no element found otherwise will show length of total product  */}
          Results for {searchedText} Total : {searchResultArray[0]===false ? ("0") : (searchResultArray.length)}
        </p>
      </h2>

      {searchResultArray.length === 0 ? (
        <div className="container-fluid">
          <Loading />
        </div>
      ) : searchResultArray[0] === false ? (
        <h1 className="display-1 fs-2 text-primary">Sorry No Product Found </h1>
      ) : (
        <div className="d-flex flex-wrap">
          {searchResultArray.map((result) => (
            <ProductCard
              key={result.pdescription}
              addToCartStatus={getAddToCartStatus}
              pname={result.pname}
              pprice={result.pprice}
              pimages={result.pimages}
              pcategory={result.pcategory}
              psubcategory={result.psubcategory}
              ptitle={result.ptitle}
              pdescription={result.pdescription}
              porigin={result.porigin}
              punits={1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowSearchedData;
