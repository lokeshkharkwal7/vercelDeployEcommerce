const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    { 
        sname :  String,
        semail :  String,
        spassword : String,
        scard :  Number,
         sphonenumber: Number
 
    });
const SELLER= mongoose.model('SELLER', schema);
module.exports=SELLER