const express = require("express")
const jswt = require("jsonwebtoken")
const secutritykey = "This is the security key";
 

// middleware is the function 
function fetchSeller(req, resp , next){

    // get the auth token from header 

    const authTokenSeller = req.header("auth-token")

    // extract the DeliveryId from the token 
    decryptedStatus = jswt.verify(authTokenSeller,secutritykey)
    if(!decryptedStatus){resp.send("Invalid JSWT Token _Not Allowed")}
    console.log(decryptedStatus)
    console.log(decryptedStatus.sellerId)

    // saving token to req.seller 
    req.Seller = decryptedStatus.sellerId


    next()
}
module.exports=fetchSeller