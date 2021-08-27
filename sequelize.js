require('dotenv').config();
const Sequelize = require('sequelize');
const todoModel = require('./models/todo');
const subtaskModel = require('./models/subtask');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

const Todo = todoModel(sequelize, Sequelize);
const SubTask = subtaskModel(sequelize, Sequelize);

Todo.hasMany(SubTask, { as: 'subtasks', foreignKey: 'todoId' });

/*uncomment the following for the first time to create tables automatically. 
then comment again.otherwise it will drop current table and create again.
you will lose existing data then  
*/
async function generateTables() {
    await sequelize.sync({ force: true })
        .then(() => {
            console.log(`Database & tables created!`);
        });
}


module.exports = {
    Todo,
    SubTask,
    generateTables
};