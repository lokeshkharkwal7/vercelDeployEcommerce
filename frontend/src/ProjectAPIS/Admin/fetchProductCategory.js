import { fetchSellerProductCategory } from "../../redux/slicers/fetchSellerProductsSlicer";
export const fetchSellerProductsbyCategory = async (
  authToken,
  category,
  dispatch
) => {
  const url = `https://vercel-deploy-ecommerce-backend.vercel.app/seller/products/${category}`;
  console.log("url passing in the fetchproductcategory is : ", url);
  try {
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const output = await response.json();
    console.log("outpout from the fetch by category api is : ", output);
    dispatch(fetchSellerProductCategory(output));
  } catch (error) {
    console.log("Error Occured while fetching ", error);
  }

  //   CALLING AN ACTION AND SENDING THE DATA TO THE REDUX STORE
};
