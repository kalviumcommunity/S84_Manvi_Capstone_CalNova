const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.post('/register',async (req,res) =>{
    const {name,email,password,role} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: 'User already exixts'});

        const user = new User({name,email,password,role });
        await user.save();

        res.status(201).json({message: 'User registered successfully'});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post ('/login', async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'Invalid credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid Credentials'});

        const token = jwt.sign(
            {userId: user._id, role: user.role},
            JWT_SECRET,
            {expiresIn: '1h'}   
        );
        res.json({token,user: {name: user.name , email: user.email, role: user.role}}); 
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});
module.exports = router;