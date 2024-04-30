const mongoose=require('mongoose');

// Define the MongoDB connection URL
// const mongoURL='mongodb://localhost:27017/Hotels'; // Replace 'mydatabase' with your database name
const mongoURL= "mongodb+srv://mudit:9460128500@cluster0.w0vcilo.mongodb.net/"
//setup MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}) 

//Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection;

// Define event listeners for database connection 

db.on('connected',()=>{
    console.log(`connected to MongoDB server`);
})

db.on('error',(err)=>{
    console.log(`MongoDB coonection error : ${err}`);
})

db.on('disconnected',()=>{
    console.log(`MongoDB disconnected`);
})

// Export the database connection
module.exports=db;