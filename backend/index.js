const express = require("express");
let cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors({
  // origin: ["https://vercel-deploy-ecommerce-frontend.vercel.app"],
  origin: ["https://wizstore.vercel.app"],
 
    methods: ["GET", "POST", "PUT", "DELETE"],
  // credentials: true
}))

// importing config files
const mongoConnect = require("./connect");
mongoConnect(); // Invoke the function to connect to MongoDB

// importing routes aka route middleware
// USER 
const userRoutes = require("./routes/users/users");
// SELLER 
const sellerRoute = require("./routes/seller/seller")
// PRODUCTS
const productRoute = require("./routes/products/products")
// CARTPRODUCT 

const cartProductRoute = require("./routes/cartProducts/cartProducts")
// calling routes
app.use("/", userRoutes); // Use the userRoutes middleware for the "/users" path
app.use("/",sellerRoute)
app.use("/",productRoute)
app.use("/",cartProductRoute)


// listening port
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 
