const express = require("express");
const bodyParser = require("body-parser");
const { Todo, SubTask } = require("./sequelize");
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
const todoController = require('./controller/todoController');
const subTaskController = require('./controller/subTaskController');
const port = 3000;

//home router
app.get('/api/v1/health', (req, res) => {
    res.send('hello from task API!!');
});

app.use('/api/v1/todo/', todoController);
app.use('/api/v1/subtask/', subtaskController);

//default error routers
app.use((req, res) => {
    res.status(404).send('404 route not found!');
});

// create a user
app.post("/api/todo", async(req, res) => {
    console.log(req.body);
    const todoCreated = await Todo.create(req.body);
    res.json(todoCreated);
});
// get all users
app.get("/api/todo", async(req, res) => {
    const todo = await Todo.findAll();
    res.json(todo);
});


app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});