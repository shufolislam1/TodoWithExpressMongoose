const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchemas')
const router = express.Router();
// creating model using mongoose Schema
const Todo = new mongoose.model("Todo", todoSchema)

// Get all todo
router.get('/', async(req, res) => {

})

// get one todo specified by id
router.get('/:id', async(req, res) => {

})

// post one todo
router.post('/', async(req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((error) => {
        if(error){
            res.status(500).json({
                error: "There was a server side error!",
            });
        }else{
            res.status(200).json({
                message: "Todo is inserted Successfully!",
            });
        }
    })
})

// post multiple todo
router.post('/all', async(req, res) => {
    await Todo.insertMany(req.body, (error) =>{
        if(error){
            res.status(500).json({
                error: "There was a server side error!"
            });
        }else{
            res.status(200).json({
                message: "Todos were inserted Successfully!"
            });
        }
    })
})

// update one todo specified by id
router.put('/:id', async(req, res) => {
    await Todo.updateOne({_id: req.params.id}, {
        $set: {
            title: "Get an internship.",
        }
    }, (error)=> {
        if(error){
            res.status(500).json({
                error: "There was a server side error!"
            });
        }else{
            res.status(200).json({
                message: "Todo was updated Successfully!"
            });
        }
    })
})

// delete one todo specified by id
router.delete('/:id', async(req, res) => {

})

module.exports = router;