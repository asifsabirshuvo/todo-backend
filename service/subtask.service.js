const { SubTask, Todo } = require("./../sequelize");
const todoService = require('./todo.service');

async function createSubtask(subtaskTitle, todoId) {
    const existingTodo = await Todo.findAll({
        where: { id: todoId },
        raw: true
    });
    if (existingTodo.length < 1) {
        return {
            status: 400,
            success: false,
            data: 'Todo does not exist'
        };

    }
    const subtaskCreated = await SubTask.create({ title: subtaskTitle, todoId: todoId });

    return {
        status: 201,
        success: true,
        data: subtaskCreated.dataValues
    };
}

async function updateSubtask(id, status) {
    let existingSubtask = await SubTask.findAll({ limit: 1, where: { id: id } });
    console.log('---------------------');
    if (existingSubtask.length < 1) {
        return {
            status: 400,
            success: false,
            data: 'Subtask does not exist'
        };
    }
    const todoUpdated = await SubTask.update({ status: status }, { where: { id: id } });
    existingSubtask[0].status = status;

    /*sometimes all the subtask of a todo maybe completed
    in such case we have to set the main todo as completed too 
    */
    let undoneSubtask = await SubTask.findAll({ where: { todoId: existingSubtask[0].todoId, status: 'pending' } });

    console.log(undoneSubtask.length);
    if (undoneSubtask.length) {
        console.log(existingSubtask[0].todoId);
        await todoService.updateTodoWithoutChildren(existingSubtask[0].todoId, 'pending');
    } else {
        await todoService.updateTodoWithoutChildren(existingSubtask[0].todoId, 'completed');
    }

    if (todoUpdated[0]) {
        return {
            status: 200,
            success: true,
            data: existingSubtask[0]
        };
    }

}


module.exports = {
    createSubtask,
    updateSubtask
};