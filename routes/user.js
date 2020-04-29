const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../models/User');
const passport = require('passport');


// login
router.get('/login',(req, res)=>{
    res.send("login")
})

// register
router.get('/register',(req, res)=>{
    res.send("register")
})

// register Handle

router.post('/register', (req, res)=>{
    console.log(req.body )
    const {name, email, password} = req.body

    User.findOne({email:email})
    .then(user=>{
        if(user){
            res.status(400).json({success:false, message:"Email is already there"})
        }
        else{
         const newUser = new User({
             name,email,password
         })

         bcrypt.genSalt(10, (err, salt)=> {
            bcrypt.hash(newUser.password, salt, (err, hash)=> {
               if(err) throw err;
               // set password to hash
               newUser.password = hash
               newUser.save()
               .then(data=>{
                   console.log(data)
                   res.status(200).json({sucess:true, data: data });
               })
               .catch(err=>console.log(err))
            });
        });
        }
    })

})

//login handle 

router.post('/login', (req, res)=>{
  
    passport.authenticate('local', (err, user) =>{
        if(err) throw err;
       else if (!user) {
            res.status(200).json({sucess:false, message:"Invalid Details" });
             }
             else{
                res.status(200).json({sucess:true, data:user });
             }
        
      })(req, res);
})


// logout handle

router.get('/logout', (req, res)=>{
    req.logout()
})


module.exports = router