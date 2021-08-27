const axios = require("axios");
const { generateTables } = require('./sequelize');
const { createTodo, updateTodo, updateTodoWithoutChildren } = require('./service/todo.service');
const { createSubtask, updateSubtask } = require('./service/subtask.service');


beforeEach(async() => {
    await generateTables();
});

//DOING API TESTS ONLY


test("(1) create todo: POST /api/v1/todo", async() => {
    const result = await axios.post('http://localhost:4000/api/v1/todo', {
        title: 'Morning tasks'
    });
    expect(result.data.success).toBeTruthy();
    const result1 = await axios.post('http://localhost:4000/api/v1/todo', {
        title: 'Evening tasks'
    });
    expect(result1.data.success).toBeTruthy();



});


test("get all todo: GET /api/v1/todo", async() => {
    const result = await axios.get("http://localhost:4000/api/v1/todo");
    expect(Array.isArray(result.data.data)).toBeTruthy();
});