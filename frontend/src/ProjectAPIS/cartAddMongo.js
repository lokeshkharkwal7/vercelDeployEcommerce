export const addDataToCartMongoDB = async (cartProductArray) => {
  const response = await fetch("https://vercel-deploy-ecommerce-backend.vercel.app/cart/addproducts", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(cartProductArray), // body data type must match "Content-Type" header
  });
  const output = await response.json();
  if (output.status === true) {
    console.log("Data is entered successfully");
  } else {
    console.log("Unable to add data to the Server");
  }
};


 
