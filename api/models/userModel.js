const { DataTypes } = require("sequelize");
const {sequelize} = require('../src/db');


sequelize.define('user', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
})