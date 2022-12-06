const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler')
const userHandler = require('./routeHandler/userHandler')

// express app initializing
const app = express();
app.use(express.json());

// connecting to mongoDb via mongoose
mongoose.connect("mongodb://127.0.0.1:27017/todos")
.then(() => console.log("Database connected!"))
.catch((error) => console.log(error))

// application routes
app.use("/todo", todoHandler)
app.use("/user", userHandler)

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
})
