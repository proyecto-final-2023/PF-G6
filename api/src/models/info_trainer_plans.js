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
      trainer_id:{
        type: DataTypes.UUID,
        defaulvalue: UUIDV4,
      },
      plan_id:{
        type: DataTypes.UUID,
        defaulvalue: UUIDV4
      },
      description:{
        type: DataTypes.STRING,
        allowNull: false
      },
      pricing:{
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { timestamps: false }
  );
};