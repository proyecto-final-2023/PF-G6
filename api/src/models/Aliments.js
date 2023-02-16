const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "aliments",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      dataType: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      //-------------------------------------------
      proteinAmount: {
        type: DataTypes.INTEGER,
      },
      proteinUnit: {
        type: DataTypes.STRING,
      },
      //-------------------------------------------
      carbohydrateAmount: {
        type: DataTypes.INTEGER,
      },
      carbohydrateUnit: {
        type: DataTypes.STRING,
      },
      //-------------------------------------------
      fatTransAmount: {
        type: DataTypes.INTEGER,
      },
      fatTransUnit: {
        type: DataTypes.STRING,
      },
      //-------------------------------------------
      fatSaturatedAmount: {
        type: DataTypes.INTEGER,
      },
      fatSaturatedUnit: {
        type: DataTypes.STRING,
      },
      //-------------------------------------------
      fatTotalAmount: {
        type: DataTypes.INTEGER,
      },
      fatTotalUnit: {
        type: DataTypes.STRING,
      },
      //-------------------------------------------
      sugarsAmount: {
        type: DataTypes.INTEGER,
      },
      sugarsdUnit: {
        type: DataTypes.STRING,
      },
      //-------------------------------------------
      sodiumAmount: {
        type: DataTypes.INTEGER,
      },
      sodiumUnit: {
        type: DataTypes.STRING,
      },
      //-------------------------------------------
      cholesterolAmount: {
        type: DataTypes.INTEGER,
      },
      cholesterolUnit: {
        type: DataTypes.STRING,
      },
      //-------------------------------------------
      energyAmount: {
        type: DataTypes.INTEGER,
      },
      energylUnit: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
