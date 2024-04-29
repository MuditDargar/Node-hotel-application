const mongoose=require('mongoose');

const menuItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
       type:String,
       enum:['sour','sweet','spicy'],
       required:true 
    },
    is_drink:{
        type:Boolean,
        default:false
    },
   ingrediants:{
        type:[String],
        default:[]
   },
    num_sales:{
        type:Number,
        default:0
    }
})

const menu=mongoose.model('menu',menuItemSchema);
module.exports=menu;