const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    { 
    //   userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
    //   sellerId :   [{ type: mongoose.Schema.Types.ObjectId, ref: "SELLER" }],
      userId : String,
      sellerId : String,

      pname: String,
      pprice: Number,
      pimages: String,
      pcategory: String,
      psubcategory: String,
      ptitle: String,
      pdescription: String,
      porigin: String,
      punits: Number
 
    });
const CARTPRODUCTS= mongoose.model('CARTPRODUCTS', schema);
module.exports=CARTPRODUCTS