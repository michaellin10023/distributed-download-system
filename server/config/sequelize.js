const Sequelize = require('sequelize');

module.exports = new Sequelize('ddsfiles','postgres','1234',{
    host: 'localhost',
    dialect: 'postgres',
    operatorAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});