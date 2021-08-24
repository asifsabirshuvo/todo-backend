const { Sequelize } = require("sequelize");

module.exports = (sequelize, type) => {
    return sequelize.define('subtask', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: type.STRING,
            notNull: true // won't allow null
        },
        status: {
            type: Sequelize.ENUM('pending', 'completed'),
            defaultValue: 'pending'
        },
        created_on: {
            type: type.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
        timestamps: false
    });
};