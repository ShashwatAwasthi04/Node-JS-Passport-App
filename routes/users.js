const express =require("express");
const router =express.Router();
const bcrypt= require('bcryptjs');
const User = require('../models/Users');

router.get('/login',(req,res)=>res.render('login'));

router.get('/register',(req,res)=>res.render('register'));

router.post('/register',(req,res) =>{
    const{name,email,password,password2 }=req.body;
    let errors=[];

    if(!name || !email ||!password ||!password2){
        errors.push({msg: 'Please fill all'});
    }

if(password!=password2){
errors.push({msg: 'Password dont match'});

}

if(password.length < 6){
    errors.push({msg: 'Password should be atleast 6 characters'});
}

if(errors.length>0){
    res.render('register', {
        errors,
        name,
        email,
        password,
        password2
    });
}
else{
    //Check for Validation
    User.findOne({email:email})
    .then(user => {
        if(user) {
            errors.push({msg: 'Email already Registered'});
            res.render('register', {
                errors,
                name,
                email,
                password,
                password2
            });
        }
        else{
            const newUser= new User({
                name,
                email,
                password
            });
            

            //Password crypt
            bcrypt.genSalt(10, (err ,salt)=> bcrypt.hash(newUser.password, salt, (err,hash) =>{
                if(err)
                throw err;

                newUser.password=hash;

                //Save User
                newUser.save()
                .then(user =>{
                    res.redirect('/views/login');
                })
                .catch(err => console.log(err));
            }))

        }
    });
}
});

module.exports= router;