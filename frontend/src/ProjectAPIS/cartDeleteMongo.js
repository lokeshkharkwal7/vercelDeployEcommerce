 const removeElementFromCartMongoDB = async (pdescription) => {
  const response = await fetch("http://localhost:4000/cart/deleteproducts", {
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