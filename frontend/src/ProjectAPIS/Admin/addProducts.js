 export const addingProductsToDatabase = async (data , sellerAuthToken) => {
  try {
    
  
    const response = await fetch("http://localhost:4000/product/create", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
         headers: {
          "Content-Type": "application/json",
          "auth-token": sellerAuthToken
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
         body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
    
      const res =  await response.json()
      if (res.status === true){
        return res
      }
    
      else{
        alert("Unable to add data to the database")
      }
    } catch (error) {
      console.log("Error Occured While entering data into the database : ", error)
    
    }
    
 }
 

 