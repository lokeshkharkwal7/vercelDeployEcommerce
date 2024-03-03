const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  seller :   [{ type: mongoose.Schema.Types.ObjectId, ref: "SELLER" }],
  pname: { type: String, required: true },
  pprice: { type: String, required: true },
  pimages: { type: String, required: true },
  pcategory: { type: String, required: true },
  psubcategory: { type: String, required: true },
  ptitle: { type: String, required: true },
  pdescription: { type: String, required: true },
  porigin: { type: String, required: true }
})
const PRODUCTS = mongoose.model("PRODUCTS", schema);
module.exports = PRODUCTS
