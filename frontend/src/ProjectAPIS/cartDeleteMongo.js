 const removeElementFromCartMongoDB = async (pdescription) => {
  const response = await fetch("https://vercel-deploy-ecommerce-backend.vercel.app/cart/deleteproducts", {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      pdescription: pdescription,
    }), // body data type must match "Content-Type" header
  });
  const output = await response.json();
  if (output.status === true) {
    console.log("Data is deleted successfully");
  } else {
    console.log("Unable to delete data to the Server");
  }
};


 export default removeElementFromCartMongoDB
