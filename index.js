const express = require('express');
const mongoose = require('mongoose');

// app initializing
const app = express();
app.use(express.json());

// connecting to mongoDb via mongoose
mongoose.connect("mongodb://127.0.0.1:27017/todos")
.then(() => console.log("Database connected!"))
.catch((error) => console.log(error))

app.get("/", (req, res) =>{
    res.send("welcome to home page")
})

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
})
