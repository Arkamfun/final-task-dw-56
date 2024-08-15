const { Sequelize } = require('sequelize');
const db = new Sequelize({
    host:'localhost',
    dialect: 'postgres',
    username: 'postgres',
    database: 'final_task',
    password: '1234',
    port: 5432,
    

})

module.exports = db;