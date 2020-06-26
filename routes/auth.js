const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');           //To hash the password
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res)=>{
    

    const emailExits = await User.findOne({email: req.body.email});

    //Checking if the email is already registered 
    if(emailExits) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword  
    });

    try{
    
        const savedUser = await user.save();
        res.send({user: savedUser._id});
        
    }catch(error){
    
        res.status(400).send(error);
    
    }
});

router.post('/login', async (req,res)=>{

    //Checking if the email is not registered
    const user = await User.findOne({ email: req.body.email }); 
    if( !user ) return res.status(400).send('Email is not Registered');
    
    //Checking if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if( !validPassword ) return res.status(400).send('Incorrect password');

    //Cretae and assign a token
    const token = jwt.sign({_id: user._id}, process.env.JWT_TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    
});

module.exports = router;  
