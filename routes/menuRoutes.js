const express = require('express');
const router=express.Router();
const Menu=require('../models/Menu');




router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new Menu(data);
      const response = await newMenu.save();
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  
  router.get('/', async (req, res) => {
    try {
      const response = await Menu.find({});
      console.log('data fetched successfully of Menu')
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  router.get('/:swad', async (req, res) => {
    try{
  const swad=req.params.swad; // Extract the work type from the URL
  if(swad=='sour' || swad=='spicy' || swad=='sweet'){
    const response = await Menu.find({taste:swad});
    console.log('data fetched successfully of menu for swad');
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


  router.put('/:itemid', async (req, res) => {
    try{
      const id=req.params.itemid; // Extract the id from the URL parameter
      const updateitemdata=req.body; //Updated data for person
      
      const response=await Menu.findByIdAndUpdate(id,updateitemdata,{
        new:true, // Return the updated document
        runValidators:true ,// Validate the updated data
      })
      if(!response){
       return  res.status(404).json({ error: 'item not found' });
      }
      console.log('data updated successfully of menuitem');
      res.status(200).json(response);
  
    }catch(err){
   console.log(err);
    res.status(500).json({ error: 'Internal server error' });
    }
  })

  router.delete('/:itemid', async (req, res) => {
    try{
      const id=req.params.itemid; // Extract the id from the URL parameter
      const response=await Menu.findByIdAndDelete(id);
      if(!response){
        return  res.status(404).json({ error: 'item not found' });
      }
      console.log('data deleted successfully of menuitem');
      res.status(200).json({message:'data deleted successfully of menuitem'});
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  module.exports = router;
  