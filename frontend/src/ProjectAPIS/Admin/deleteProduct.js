import { deleteSellerProductAction } from "../../redux/slicers/fetchSellerProductsSlicer";
export const deleteSellerProduct = async (pname, authTokenSeller , dispatch) => {
  const response = await fetch(
    `http://localhost:4000/seller/products/${pname}`,
    {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": authTokenSeller,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  const deleteRes = await response.json(); // parses JSON response into native JavaScript objects
  if (deleteRes.deletedCount === 1) {
    alert("Data Deleted Successfully");
    dispatch(deleteSellerProductAction(pname))
    // Creating a redux store update for filtering of the product 
  } else {
    alert("Data Already Deleted");
  }
  //   now deleting that element from the state as well
};
