const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
// we create schema 
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true // this is for unique email
    },
    address:{
        type:String,

    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

personSchema.pre('save',async function(next){
    const person=this;
            // Hash the password only if it has been modified (or is new)
            if(!person.isModified('password')) return next() ;
    try {
        //hash password generation
  const salt=await bcrypt.genSalt(10);

  //hash password
  const hashedPassword=await bcrypt.hash(person.password,salt);

  //Override the plain password with the hashed one
  person.password=hashedPassword;
  next();
      
    } catch (error) {
        return next(error);
    }
})

// Define comparePassword method
personSchema.methods.comparePassword=async function(candidatepassword){
    try {
       // use bcrypt to compare the provided password with the hashed password
       const isMatch=await bcrypt.compare(candidatepassword,this.password) ;
       return isMatch; // return the result of comaprision
    } catch (error) {
        throw error;
    }
}

//  How this work
//  example :--


// md ---> bdgidfegweiwei2@13331132ddscd3g
//login --> sachinramesh

// compare function do this 

// bdgidfegweiwei2@13331132ddscd3g --> extract salt
// salt + sachinramesh --> hash --> fkjniehgeoiw38538fnj@fkjef





// Create Person Model 
const Person=mongoose.model('Person',personSchema);

module.exports=Person;