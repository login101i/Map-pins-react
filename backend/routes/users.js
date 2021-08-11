const router=require("express").Router()
const User=require('../models/User')

const bcrypt = require("bcrypt");


// register
router.post('/register', async (req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password, salt)
                // generuj nowe hasło
                            const newUser=new User({
                                username:req.body.username,
                                email:req.body.email,
                                password:hashedPassword
                            })
        // generuj nowego użytkownika
        console.log(newUser)
       
        const savedNewUser=await newUser.save()
        res.status(200).json(savedNewUser)
    }catch(err){
        res.status(500).json(err)
    }
})

// login
router.post("/login", async (req,res)=>{
    try{
        // znajdź użytkownika
        const user=await User.findOne({username:req.body.username})
        console.log(user)
        !user && res.status(400).json("Nieprawidłowe hasło lub login")

        // walidacja hasła
        const validPassword=await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Nieprawidłowe hasło lub login")

        // wyślij response
        res.status(200).json({
            _id:user._id,
            name:user.username
        })

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports= router