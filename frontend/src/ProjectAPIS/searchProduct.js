// This api call is for searching the products using $text in Mongo db

import { storeSearchData } from "../redux/slicers/searchProduct";

export const seachProductResultApiCall = async (pname, dispatch) => {
  console.log("Searched API Call");
  try {
    const response = await fetch(
      `https://vercel-deploy-ecommerce-backend.vercel.app/user/products/search/${pname}`,
      {      
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   "auth-token": authToken,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const productData = await response.json(); // parses JSON response into native JavaScript objects
    //   adding the information to our redux store using useDispatch
    console.log(
      "The value of productData which is the output of the products from the api is : ",
      productData.data
    );

    //   saving the searched values to the redux state
    if (productData.data.length === 0) {
      dispatch(storeSearchData([false]));
    } else {
      dispatch(storeSearchData(productData.data));
    }
  } catch (error) {
    console.log(
      "Error Encountered while fetching the data from the front end : ",
      error
    );
  }
};

// ERRORS ENCOUTERED :
// SINCE THIS IS NOT A REACT FUNCTION COMPONENT SO DISPATCH SHOULD ONLY BE TAKEN FROM THE HOME
// COMPONENT ONLY AS AN PARAMETER AND IF USED LIKE NORMAL IT WILL CAUSE AN ERROR
