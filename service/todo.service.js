const { Todo, SubTask } = require("./../sequelize");

async function allTodo(page, limit) {
    console.log(page, limit);
    const todos = await Todo.findAll({
        offset: (page - 1) * limit,
        limit: limit,
        include: [{
            model: SubTask,
            as: "subtasks"
        }]
    });

    return {
        status: 200,
        success: true,
        data: todos
    };

}

async function createTodo(todoTitle) {
    const todoCreated = await Todo.create({ title: todoTitle });
    return {
        status: 201,
        success: true,
        data: todoCreated.dataValues
    };
}

async function updateTodo(id, status) {
    let existingTodo = await Todo.findAll({ limit: 1, where: { id: id } });
    console.log(existingTodo);
    const todoUpdated = await Todo.update({ status: status }, { where: { id: id } });
    //update its children too
    await SubTask.update({ status: status }, { where: { todoId: id } });

    existingTodo[0].status = status;
    if (todoUpdated[0]) {
        return {
            status: 201,
            success: true,
            data: existingTodo[0]
        };
    }
}


module.exports = {
    allTodo,
    createTodo,
    updateTodo
};