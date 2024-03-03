const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    { 
        name :  String,
        email :  String,
        password : String,
        city :  String,
        address: String,
        card :  Number,
        gender: String,
        state: String,
        phonenumber: Number,
        pincode : Number

    });
const USER= mongoose.model('USER', schema);
module.exports=USER