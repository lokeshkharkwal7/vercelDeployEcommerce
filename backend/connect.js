// //CONNECTING TO THE MONGOOSE SERVER
// const mongoose = require('mongoose')
// const uri = "mongodb+srv://lokeshkharkwal:lokeshkharkwal@cluster0.ntpuvkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// try {
//     mongoose.connect(uri).then(
//     console.log('Connected to the Database'))
// } catch (error) {
//     console.log(error)
    
// }


// // mongoose.connect(uri)
// // .then("console.log("You are connected")
// // .catch(err => console.log(err.reason));

const mongoose = require('mongoose');
const uri = "mongodb+srv://lokeshkharkwal:lokeshkharkwal@cluster0.ntpuvkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the Database');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectToMongoDB;
