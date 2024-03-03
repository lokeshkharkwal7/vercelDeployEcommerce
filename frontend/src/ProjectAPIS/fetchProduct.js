// THIS MODULE WILL FETCH THE PRODUCTS BASED ON THE CATEGORY 7
// importing the actions from the redux slicers
import { fetchdataRequest } from "../redux/slicers/fetchProductSlicer";

export const fetchProducts = async (authToken,category, dispatch) => {
  console.log(
    "The value of the authToken passed inside the fetchproduct is : ",
    authToken
  );
  try {
    
 
  const response = await fetch(`https://vercel-deploy-ecommerce-backend.vercel.app/product/${category}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  console.log(
    "Here is the output of the response that is inside the fetchProduct : ",
    response
  );
  const productData = await response.json(); // parses JSON response into native JavaScript objects
  //   adding the information to our redux store using useDispatch
  console.log(
    "The value of productData which is the output of the products from the api is : ",
    productData
  );
  dispatch(fetchdataRequest(productData));
} catch (error) {
    console.log("Error Encountered while fetching the data from the front end : ",error)
    
}
};

// ERRORS ENCOUTERED : 
// SINCE THIS IS NOT A REACT FUNCTION COMPONENT SO DISPATCH SHOULD ONLY BE TAKEN FROM THE HOME
// COMPONENT ONLY AS AN PARAMETER AND IF USED LIKE NORMAL IT WILL CAUSE AN ERROR 
