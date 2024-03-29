let cors = require("cors");

const express = require("express");
const router = express.Router();
router.use(express.json());
const Product = require("../../model/products");
const fetchSeller = require("../../middleware/fetchSeller");

// creating products

router.post("/product/create", fetchSeller, async (req, resp) => {
  try {
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
  } catch (error) {
    console.log("Error Occured while adding  Product : ", error);
  }
});

// fetching products

router.get("/product/:category", async (req, resp) => {
  try {
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
  } catch (error) {
    console.log("Error Occured while fetching products  : ", error);
  }
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
  try {
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
  } catch (error) {
    console.log("Error Occured while fetching products by Category  : ", error);
  }
});

// deleting the products as per the seller id and product name
router.delete("/seller/products/:pname", fetchSeller, async (req, resp) => {
  try {
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
  } catch (error) {
    console.log("Error Occured while fetching Seller Products  : ", error);
  }
});

// updating the products as per the seller id and product name
router.put("/seller/products/:pname", fetchSeller, async (req, resp) => {
  //  getting all the information from the form
  try {
    pname = req.params.pname;
    const sellerId = req.Seller;
    const reqData = req.body;

    // saving all the information to the mongodb database

    data = await Product.updateOne({ pname: pname, seller: sellerId }, reqData);

    if (!data) {
      resp.send("Unable to send the data to the server");
    }
    resp.json(data);
  } catch (error) {
    console.log(
      "Error Occured while fetching product and the error is : ",
      error
    );
  }
});

// Making the search api in mongoose
// updating the products as per the seller id and product name
router.post("/user/products/search/:pname", async (req, resp) => {
  //  getting all the information from the form
  try {
    pname = req.params.pname;

    // saving all the information to the mongodb database

    data = await Product.find({
      $text: {
        $search : pname
      },
    });

    if (!data) {
      resp.send("Unable to send the data to the server");
    }
    resp.json({
      status : true , 
      data : data
    });
  } catch (error) {
    console.log(
      "Error Occured while fetching product and the error is : ",
      error
    );
  }
});

module.exports = router;
