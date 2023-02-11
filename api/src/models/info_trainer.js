const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.UUID,
        defaulvalue: UUIDV4,
        primaryKey: true,
      },
      degrees:{
        type: DataTypes.STRING,
        allowNull: false
      },
      certification:{
        type: DataTypes.STRING,
        allowNull: false
      },
      image:{
        type: DataTypes.STRING,
        allowNull: false
      },
      logo:{
        type: DataTypes.STRING,
        allowNull: false
      },
      social_networks:{
        type: DataTypes.STRING,
        allowNull: false
      },
      id_plans:{
        type: DataTypes.UUID,
        defaulvalue: UUIDV4
      }
    },
    { timestamps: false }
  );
};