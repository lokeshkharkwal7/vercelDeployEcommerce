const express = require('express')
const router = express.Router()
router.use(express.json());
const fetchUser = require("../../middleware/fetchUser")

const CARTPRODUCTS  = require("../../model/cartItems")
// FOR ADDING THE CART PRODUCTS TO THE DATABASE 
router.post("/cart/addproducts", async(req , res)=>{
    const cartData = req.body
    const cartDataArray = Array(cartData)
    console.log("Data that we get from req.body is : ", cartData, "type is ", typeof cartDataArray)
    const cartResponse = await CARTPRODUCTS.insertMany(
        cartData
    )
    if(!cartResponse){
        res.json({
            status : false ,
            message : "Unable to update in server"
        })   
    }
    res.json({
        status : true ,
        data : "Done Data updated to the server"
    })
})


// FOR DELETING THE PRODUCTS FROM THE CART DATABAS 
router.delete("/cart/deleteproducts",async(req , res)=>{


      
    const deletestatus = await CARTPRODUCTS.deleteMany({
        pdescription : req.body.pdescription
    })
      
    if(!deletestatus){
        res.json({
            status : false ,
            message : "Unable to delete from the server"
        })   
    }
    res.json({
        status : true ,
        data : "Done Data deleted from the server"
    })
})

module.exports = router



// FOR DELETING ALL THE PRODUCTS FROM THE CART WITH THE SAME USERID
router.delete("/cart/deleteproducts/emptycart",async(req , res)=>{


      
    const deletestatus = await CARTPRODUCTS.deleteMany({
        userId : req.body.userId
    })
      
    if(!deletestatus){
        res.json({
            status : false ,
            message : "Unable to delete from the server"
        })   
    }
    res.json({
        status : true ,
        data : "Done Data deleted from the server"
    })
})


// FOR FETCHING CART ITEMS BASED ON THE USER AUTH TOKEN 
router.get("/cart/fetchproduct", fetchUser, async(req , res)=>{

    //  req.user will be comming from the middleware 
    const userId = req.user
    console.log("user id found : ", userId)
      
    const cartItems = await CARTPRODUCTS.find({
        userId : userId
    }).select('-_id')
    console.log("value of cart item : ", cartItems)
     

      
    if(!cartItems){
        res.json({
            status : false ,
            message : "Unable to fetch cart details from the server"
        })   
    }
    res.json({
        status : true,
        data : cartItems
     })
})

module.exports = router

// ERRORS : 

// HERE I ENCOUNTERED MAJORE ERROR BECAUSE IN MY MONGO DB DATABASE I HAVE MULTIPLE ENTERIES OF PRODUCTS FROM DIFFERENT USERS 
// AND ALL OF THEM HAVE SAME _ID SO I NEED TO REMOVE IT FROM THE API 