const express = require("express");
const USER = require("../../model/user");
const router = express.Router();
const jswt = require("jsonwebtoken");
const secutritykey = "This is the security key";
const fetchUser = require("../../middleware/fetchUser")
router.use(express.json());

// create
router.post("/users/signup", async (req, res) => {
  const {
    name,
    email,
    password,
    phonenumber,
    city,
    state,
    pincode,
    gender,
    card,
    address,
  } = req.body;
  try {
    const status = await USER.create({
      name: name,
      email: email,
      password: password,
      city: city,
      gender: gender,
      card: card,
      phonenumber: phonenumber,
      state: state,
      pincode: pincode,
      address: address,
    });
    if(!status){ res.send("Please Provide with the correct details") }
    const {_id:userId} = status
    token = jswt.sign({"userId":userId},secutritykey)
    res.send(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//AUTHENTICATING

router.post("/users/login", async (req, res) => {
  // getting data from the user
try {
  

  const { email, password } = req.body;

  // finding email from the mongodb

  const status = await USER.findOne({
    email: email,
  });

  if (!status) {
    res.send("Email not found in the database");
  }
  // extracting password from response
  const { email: eml, password: pwd, _id: userid } = status;
  console.log(status);

  console.log("email is ", eml);
  console.log("Password is ", pwd);

  // comparing email and password

  if (email === eml && password === pwd) {

    // how to create a jswt token 
    token = jswt.sign({"userid":userid,
  "status":true}, secutritykey);
    //

    res.json({
      authToken:token,
      status : true
    });
  } else {
    res.json({
      authToken:0,
      status : false
    })
  }

} catch (error) {

  console.log(Error)
  
       
  
}
}
);



router.get("/user/fetchUser", fetchUser , async(req, res)=>{
try {
  

  const userId = req.user
  const response = await USER.findOne({
    _id : userId
  })
  res.json({
    data : response,
    status : true
  })
} catch (error) {
  res.json({
    data : null ,
    status : false
  })
  
}

})
module.exports = router;
