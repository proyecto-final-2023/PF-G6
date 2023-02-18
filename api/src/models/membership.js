const { DataTypes } = require("sequelize");

module.exports = (sequelize)=>{
    sequelize.define("membership",{
        id_membership:{
            type:DataTypes.UUID,
            allowNull:false,
        }
    })
}