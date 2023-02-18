const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define("plan_trainee",{
        id_PlanTrainee:{
            type:DataTypes.UUID,
            allowNull:false,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        cost:{
            type:DataTypes.DECIMAL,
            allowNull:false,
            defaultValue:0,
        },
        description:{
            type: DataTypes.STRING,
            allowNull:false,
        }
    });
};