let cors = require("cors");

const express = require("express");
const router = express.Router();
router.use(express.json());
const Product = require("../../model/products");
const fetchSeller = require("../../middleware/fetchSeller");

// creating products

router.post("/product/create", fetchSeller, async (req, resp) => {
  // getting the selers information using middleware

  const sellerId = req.Seller;
  console.log("Value of seller id inside route", sellerId);

  //  getting all the information from the form

  const {
    pname,
    pprice,
    pimages,
    pcategory,
    psubcategory,
    ptitle,
    pdescription,
    porigin,
  } = req.body;

  // saving all the information to the mongodb database

  data = await Product.create({
    seller: sellerId,
    pname: pname,
    pprice: pprice,
    pimages: pimages,
    pcategory: pcategory,
    psubcategory: psubcategory,
    ptitle: ptitle,
    pdescription: pdescription,
    porigin: porigin,
  });
  if (!data) {
    resp.json({
      status: false,
      message: "Unable to send the data to the server",
    });
  }
  resp.json({
    status: true,
    message: "Data successfully added",
  });
});

// fetching products

router.get("/product/:category", async (req, resp) => {
  //  getting all the information from the form

  category = req.params.category;

  // saving all the information to the mongodb database

  data = await Product.find({
    pcategory: category,
  });

  if (!data) {
    resp.send("Unable to send the data to the server");
  }
  resp.json(data);
});
// fetching all products

router.get("/seller/product/fetchall", fetchSeller, async (req, resp) => {
  try {
    const seller = req.Seller;
    const sellerId = seller;
    console.log("sellerId : ", sellerId);

    // saving all the information to the mongodb database

    data = await Product.find({
      seller: sellerId,
    });

    if (!data) {
      resp.send("Unable to send the data to the server");
    }
    resp.json(data);
  } catch (error) {
    console.log(
      "Error occured while fetching all seller information : ",
      error
    );
  }
});

// fetching product based on category
router.get("/seller/products/:category", fetchSeller, async (req, resp) => {
  //  getting all the information from the form

  category = req.params.category;
  const sellerId = req.Seller;

  // saving all the information to the mongodb database

  data = await Product.find({
    pcategory: category,
    seller: sellerId,
  });

  if (!data) {
    resp.send("Unable to send the data to the server");
  }
  resp.json(data);
});

// deleting the products as per the seller id and product name
router.delete("/seller/products/:pname", fetchSeller, async (req, resp) => {
  //  getting all the information from the form

  pname = req.params.pname;
  const sellerId = req.Seller;

  // saving all the information to the mongodb database

  data = await Product.deleteOne({
    pname: pname,
    seller: sellerId,
  });

  if (!data) {
    resp.send("Unable to send the data to the server");
  }
  resp.json(data);
});

// updating the products as per the seller id and product name
router.put("/seller/products/:pname", fetchSeller, async (req, resp) => {
  //  getting all the information from the form

  pname = req.params.pname;
  const sellerId = req.Seller;
  const reqData = req.body

  // saving all the information to the mongodb database
 

  data = await Product.updateOne({ pname: pname, seller:sellerId}, reqData);

  if (!data) {
    resp.send("Unable to send the data to the server");
  }
  resp.json(data);
});



// let status = await Note.updateOne(
//   { _id: new ObjectId(id) },
//   { $set: updatedNote }
// );


module.exports = router;
