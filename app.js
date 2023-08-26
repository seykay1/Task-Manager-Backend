require("dotenv").config();
const express = require("express");
const taskRouter = require("./routes/taskRouter");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// GET
// POST
// PATCH/PUT
// DELETE

// Urls - endpoints
// /tasks - all of the tasks
// /tasks/create - create a new task
// /tasks/id - each task - GET
// /tasks/id - delete task - DELETE
// /tasks/id - update task - PATCH

const dbURL = `${process.env.DB_URL}`;

app.use(morgan("dev"));
app.use(cors());

app.use(express.json()); //convert incoming request

// app.use((req, res, next)=>{
//     console.log('i run everytime...');
//     next();
// })

app.use("/tasks", taskRouter);

// app.get('/tasks', (req, res)=>{
//     console.log('a request just came in...');
//     res.status(200).json({title: 'All tasks on the DB'})
// });

// app.post("/tasks/create",(req, res) => {
//     console.log("a post request just came...");
//     res.status(200).json({title: 'Create a new task'})
// });

// app.get("/tasks/id",(req, res) => {
//        res.status(400).json({title: 'Get each task'})
// });

app.use((req, res, next) => {
  res.status(404).json({ message: "URL not found" });
});

// Middlewares:

const start = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("DB connected!");
    app.listen(port, console.log(`Server is now running on Port 3000`));
  } catch (error) {
    console.log("Could not connect because");
    console.log(error);
  }
};

start();
