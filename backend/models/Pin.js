const mongoose=require('mongoose');


const PinSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
        min:3,
        max:30,
    },
       description:{
        type:String,
        require:true,
        min:1,
        max:5,
    },
       lat:{
        type:Number,
        require:true,
    },
          long:{
        type:Number,
        require:true,
    },
    rating:{
        type:Number,
        require:true,
        min:1,
        max:5
    }

},
{timestamps:true}
 )


 module.exports=mongoose.model("Pin", PinSchema)
