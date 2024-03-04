
const express = require("express");
const router = express.Router();
router.use(express.json());
const SELLER = require("../../model/seller")
// JSWT
const jswt = require("jsonwebtoken")
const secutritykey = "This is the security key";
const fetchSeller = require("../../middleware/fetchSeller")

// creating products 

router.post("/seller/signup",async(req, resp)=>{

  try {
    
 
    //  getting all the information from the form 

    const {
        sname  ,
        semail  ,
        spassword , 
        scard  ,
         sphonenumber 
    } = req.body

    // saving all the information to the mongodb database 
     console.log(req.body)
     const data = await SELLER.create({
        sname: sname,
        semail: semail,
        spassword: spassword,
        scard: scard,
        sphonenumber: sphonenumber,
      });
      console.log(data)
     
    if(!data){resp.send("Unable to send the data to the server")}

    // creating jswt token
    
    const token = jswt.sign({sellerId : data._id , status : true},secutritykey)
    resp.send(token)
  } catch (error) {
    console.log("Error Occured while sign up : ", error)
    
  }
})


// /AUTHENTICATING

router.post("/seller/login", async (req, res) => {

  try {
    
 
  // getting data from the user

  const { semail, spassword } = req.body;

  // finding email from the mongodb

  const status = await SELLER.findOne({
    semail: semail
  });

  if (!status) {
    res.send("Email not found in the database");
  }
  // extracting password from response
  const { semail: eml, spassword: pwd, _id: sellerId } = status;
  console.log(status);

  console.log("email is ", eml);
  console.log("Password is ", pwd); 

  // comparing email and password

  if (semail === eml && spassword === pwd) {

    // how to create a jswt token 
    token = jswt.sign({"sellerId":sellerId,
  "status":true}, secutritykey);
    //

    res.json({
      status : true , 
      authToken : token
    });
  } else {
    res.send("Failed Please check credentials");
  }
} catch (error) {
    console.log("Error occured while Login ", error)
}
});
 

// FETCHING SELLER INFORMATION 
// AUTHENTICATING

router.get("/seller/fetchseller", fetchSeller , async (req, res) => {
  // getting data from the user
try{
  const sellerId = req.Seller

  // finding email from the mongodb

  const sellerDetail = await SELLER.findOne({
    _id: sellerId
  });

  if (!sellerDetail) {
    res.send("Email not found in the database");
  }
    

    res.json({
      status : true , 
      data : sellerDetail
    });
  } catch {
    res.send("Failed Please check credentials");
  }
});


module.exports = router

 
