require('dotenv').config();
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
const todoController = require('./controller/todo.controller');
const subTaskController = require('./controller/subtask.controller');

//home router
app.get('/api/v1/health', (req, res) => {
    res.send('hello from task API!!');
});

app.use('/api/v1/todo/', todoController);
app.use('/api/v1/subtask/', subTaskController);

//default error routers
app.use((req, res) => {
    res.status(404).send('404 route not found!');
});



app.listen(process.env.PORT, () => {
    console.log(`Running on http://localhost:${process.env.PORT}`);
});