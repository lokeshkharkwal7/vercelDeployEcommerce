export const fetchSellerProducts = async (sellerAuthToken) => {
  try {
    const response = await fetch(
      "http://localhost:4000/seller/product/fetchall",
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": sellerAuthToken, 
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }, 
      }
    );
    const allProducts = await response.json(); // parses JSON response into native JavaScript objects
    //   Not Using the redux toolkit
    if (!allProducts) {
      alert("Unable to load products");
    }
    return allProducts;
  } catch (error) {
    console.log("Error Occured while fetch Details are : ", error);
  }
};
