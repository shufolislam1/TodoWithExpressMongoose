const express = require('express');
const bcrypt = require('bcrypt');
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


module.exports = router;