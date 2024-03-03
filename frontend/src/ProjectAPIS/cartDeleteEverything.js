

  export const cartDeleteEverything = async (userId) => {
    const response = await fetch("https://vercel-deploy-ecommerce-backend.vercel.app/cart/deleteproducts/emptycart", {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        userId: userId,
      }), // body data type must match "Content-Type" header
    });
    const output = await response.json();
    if (output.status === true) {
      console.log("Data is deleted successfully");
    } else {
      console.log("Unable to delete data to the Server");
    }
  };                
