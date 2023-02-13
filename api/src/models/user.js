const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    status:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    first_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    last_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    nick_name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    rol:{
        type:DataTypes.STRING,
        allowNull:false,
    },
  }, {timestamps:false});
};