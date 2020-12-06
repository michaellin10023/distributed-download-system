const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
// import { uid } from 'uid';

const file = sequelize.define('file', {
    id : {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    name : {
        type : Sequelize.STRING
    },
    ext : {
        type : Sequelize.STRING
    },
    status : {
        type : Sequelize.STRING,
        defaultValue : 'downloading'
    },
    partCount : {
        type : Sequelize.INTEGER
    },
    parts : {
        type : Sequelize.ARRAY(Sequelize.BLOB)
    },
    reason : {
        type : Sequelize.STRING,
        defaultValue : 'none'
    },
    index : {
        type : Sequelize.INTEGER,
        defaultValue : 0
    },
    keys : {
        type : Sequelize.ARRAY(Sequelize.STRING)
    }
});

sequelize.sync({ force : false})
.then(() => {
    console.log('Database & tables created!');
})

module.exports = file;