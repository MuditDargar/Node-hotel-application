const express=require('express');
const router=express.Router();
const Person = require('../models/Person') // Import the Person model
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

router.post('/signup' , async (req, res) => {
    try {
      const data = req.body;  //Assuming the request body contains the person data
       // Create a new Person document using the Mongoose model
      const newPerson = new Person(data);  // by this you can pass all at one time
      // Save the new person document to the database
      const response = await newPerson.save();
 console.log('data saved');

    const payload={
      id:response.id ,
      username:response.username
    }
    console.log(JSON.stringify(payload))
 const token=generateToken(payload);
console.log("Token is :",token);
  res.status(200).json({response:response , token: token }); // Send the newly created person document back to the client
 // Send only the response without the extra string
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// login route
router.post('/login',async(req,res)=>{
 try {
  // Extract the username and password from request body
  const {username,password}=req.body;

  //Find the user by username
  const user= await Person.findOne({username:username}) ;

// If user does not exist or password does not match ,return error
if(!user || !(await user.comparePassword(password))){
  return res.status(401).json({ error: 'Invalid username or password ' });
}
 // generate token
 const payload={
  id:user.id ,
  username:user.username
 }
 const token=generateToken(payload);

//return token as response
res.json({token})

 } catch (error) {
  console.log(error);
  res.status(500).json({ error: 'Internal server error' });
 }
})

//profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
 try{
  const userData=req.user;
  console.log("user Data",userData);

  const userid=userData.id;
  const user=await Person.findById(userid);

  res.status(200).json({user});

 }
 catch(error){
console.log(error);
res.status(500).json({ error: 'Internal Server Error' });
 }
})

router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
      const response = await Person.find({}); // Find all the documents in the collection
      console.log('data fetched successfully of person');
      res.status(200).json(response); // Send only the response without the extra string
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/:worktype', async (req, res) => {
    try{
  const worktype=req.params.worktype; // Extract the work type from the URL
  if(worktype=='chef' || worktype=='waiter' || worktype=='manager'){
    const response = await Person.find({work:worktype});
    console.log('data fetched successfully of person for worktype');
    res.status(200).json(response);
  }
  else{
    res.status(404).json({ error: 'Invalid work type' });
  }
    }
    catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })


router.put('/:person_id', async (req, res) => {
  try{
    const id=req.params.person_id; // Extract the id from the URL parameter
    const updatePersondata=req.body; //Updated data for person
    
    const response=await Person.findByIdAndUpdate(id,updatePersondata,{
      new:true, // Return the updated document
      runValidators:true ,// Validate the updated data
    })
    if(!response){
     return  res.status(404).json({ error: 'Person not found' });
    }
    console.log('data updated successfully of person');
    res.status(200).json(response);

  }catch(err){
 console.log(err);
  res.status(500).json({ error: 'Internal server error' });
  }
})

router.delete('/:person_id', async (req, res) => {
  try{
    const id=req.params.person_id; // Extract the id from the URL parameter
    const response=await Person.findByIdAndDelete(id);
    if(!response){
      return  res.status(404).json({ error: 'Person not found' });
    }
    console.log('data deleted successfully of person');
    res.status(200).json({message:'data deleted successfully of person'});
  }catch(err){
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router;
  
  
  