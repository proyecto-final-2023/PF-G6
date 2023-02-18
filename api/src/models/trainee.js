const {DataTypes}= require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define("trainee",{
        id_trainee:{
            type: DataTypes.UUID,
            allowNull:false,
        },
        logo:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    });
};