const mongoose=require('mongoose');


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:10,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        min:3,
        max:30,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    }
},
{timestamps:true}
 )


 module.exports=mongoose.model("User", UserSchema)
