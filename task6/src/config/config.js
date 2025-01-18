//Task1
const mongoose =require('mongoose');
const connectToMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("mongodb connected");
    }catch(error){
        console.log("Error in connecting DB",error.message)
    }
}
module.exports=connectToMongoDB;
//Task2
const mongoose =require('mongoose');
const connectToMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("mongodb connected");
    }catch(error){
        console.log("Error in connecting DB",error.message)
    }
}
module.exports=connectToMongoDB;
//Task5
const dotenv = require('dotenv');

// Load environment variables from a .env file if available
dotenv.config();

// Configuration object
const config = {
  // MongoDB URI
  mongoURI: process.env.MONGO_URI || 'mongodb+srv://Jahnavi@cluster-1.ancjw.mongodb.net/',
  
  // Server port
  port: process.env.PORT || 8080, 

 
};

module.exports = config;
//task6
const mongoose =require('mongoose');
const connectToMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("mongodb connected");
    }catch(error){
        console.log("Error in connecting DB",error.message)
    }
}
module.exports=connectToMongoDB;
//task7
