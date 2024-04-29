const express=require('express');
const router=express.Router();
const Person = require('../models/Person') // Import the Person model

router.post('/', async (req, res) => {
    try {
      const data = req.body;  //Assuming the request body contains the person data
       // Create a new Person document using the Mongoose model
      const newPerson = new Person(data);  // by this you can pass all at one time
      // Save the new person document to the database
      const response = await newPerson.save();
      res.status(200).json(response); // Send only the response without the extra string
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/', async (req, res) => {
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
  
  
  