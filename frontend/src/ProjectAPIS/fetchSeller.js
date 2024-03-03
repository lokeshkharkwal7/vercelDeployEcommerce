// This is the fetchseller middleware that will assign local storage with all the seller details and will return the true or false so that it can be easily used in if elase in login page 
export const fetchSeller = async (authToken) => {
    try {
        console.log("auth token inside the middleware is : ", authToken)
      const response = await fetch("http://localhost:4000/seller/fetchseller", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      let sellerData = await response.json(); // parses JSON response into native JavaScript objects
      if (sellerData.status === true){
        const sellerDataJson = JSON.stringify(sellerData.data)
        localStorage.setItem("sellerDetails",sellerDataJson )
        console.log("value of seller inside the fetchSeller middleware is ",localStorage.getItem("sellerDetails"))
      }
      return true

      
    
} catch (error) {

    console.log("Error Occured",error)
    return false
    
}
}