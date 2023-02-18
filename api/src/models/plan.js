const { DataTypes } = require("sequelize");

module.exports = (sequelize)=>{
    sequelize.define("plan",{
        id_plan:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    })
}