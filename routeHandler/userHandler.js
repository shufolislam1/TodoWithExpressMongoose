const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema')
const router = express.Router();
// creating model using mongoose Schema
const User = new mongoose.model("User", userSchema)

// signup
router.post('/signup', async(req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            userName: req.body.userName,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
            message: "Signup successfull!!!",
        })
    }catch{
        res.status(500).json({
            message: "Signup Failed!!!",
        })
    }
})

// login
router.post('/login', async(req,res) => {
    try{
        const existUser = await User.find({username: req.body.username});
        if(existUser && existUser.length > 0){
            const isValidPassword = await bcrypt.compare(req.body.password, existUser[0].password);
            if(isValidPassword){
                // Generate Token
                const token = jwt.sign({
                    username: existUser[0].username,
                    userid: existUser[0]._id

                }, process.env.JWT_SECRET,{
                    expiresIn: '1h'
                })
                res.status(200).json({
                    "access_token": token,
                    "message": "Login Successfull!"
                })

            }else{
                res.status(401).json({
                    "error": "Authentication Failed!!!"
                })
            }
        }else{
            res.status(401).json({
                "error": "Authentication Failed!!!"
            })
        }
    }catch{
        res.status(401).json({
            "error": "Authentication Failed!!!"
        })
    }

})

module.exports = router;