export const editAdminProduct = async (
  pname,
  addProductData,
  sellerAuthtoken
) => {

  const response = await fetch(
    `http://localhost:4000/seller/products/${pname}`,
    {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": sellerAuthtoken,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(addProductData), // body data type must match "Content-Type" header
    }
  );
  const updateResult = response.json();
  
  if (updateResult.modifiedCount === 1) {
    console.log("Success Data Updated Successfully ");
  } else {
    console.log( `http://localhost:4000/seller/products/${pname}`);
  }
};
