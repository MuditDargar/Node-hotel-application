// POST method used for save the data in the database
// GET method used for get the data from the database
// PUT method used for update the data in the database
// DELETE method used for delete the data in the database


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db'); // Assuming db.js sets up Mongoose connection

const Menu=require('./models/Menu');
app.use(bodyParser.json()); // req.body

app.get('/', function (req, res) {
  res.send('Welcome to my hotel. How can I help you?');
});

//Import the router files for person
const personRoutes=require('./routes/personRoutes');

// Use the routers in the app for person
app.use('/person',personRoutes);


// Import the router files for menu
const menuRoutes=require('./routes/menuRoutes');

// Use the routers in the app for menu
app.use('/menu',menuRoutes);




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// 3000 is the port number


