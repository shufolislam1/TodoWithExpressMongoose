const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema')
const router = express.Router();
// creating model using mongoose Schema
const User = new mongoose.model("User", userSchema)

// signup
router.post('/', async(req, res) => {

})


module.exports = router;