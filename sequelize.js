const Sequelize = require('sequelize');
const todoModel = require('./models/todo');
const subtaskModel = require('./models/subtask');

const sequelize = new Sequelize('test', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Todo = todoModel(sequelize, Sequelize);
const SubTask = subtaskModel(sequelize, Sequelize);


Todo.belongsToMany(SubTask, { through: 'todoId', unique: false });

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`)
//   })

module.exports = {
    Todo,
    SubTask
};