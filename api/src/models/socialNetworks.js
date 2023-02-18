const{DataTypes}= require('sequelize');

module.exports=(sequelize)=>{
    sequelize.define("social_networks",{
        id_sn:{
            type:DataTypes.UUID,
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        url:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    })
}