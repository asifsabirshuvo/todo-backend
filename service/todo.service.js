const { Todo } = require("./sequelize");

async function createTodo() {
    return await Todo.findAll();
}

async function


module.exports = {
    todoCreated
}