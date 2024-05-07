// POST method used for save the data in the database
// GET method used for get the data from the database
// PUT method used for update the data in the database
// DELETE method used for delete the data in the database


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db'); // Assuming db.js sets up Mongoose connection
require('dotenv').config();
const passport=require('./auth');

const Person=require('./models/Person');

const Menu=require('./models/Menu');
app.use(bodyParser.json()); // req.body

const PORT=process.env.PORT || 3000 ;

// Middleware function
const logrequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request received: ${req.originalUrl}`);
  next(); // Continue to the next middleware orr Move on to the next middleware phase
}


app.use(logrequest)

  

app.use(passport.initialize());
const localauthmiddleware=passport.authenticate('local',{session:false});

app.get('/' , function (req, res) {
  res.send('Welcome to my hotel. How can I help you?');
});

//Import the router files for person
const personRoutes=require('./routes/personRoutes');

// Use the routers in the app for person
app.use('/person', localauthmiddleware,personRoutes);


// Import the router files for menu
const menuRoutes=require('./routes/menuRoutes');

// Use the routers in the app for menu
app.use('/menu' ,menuRoutes);





app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// 3000 is the port number


