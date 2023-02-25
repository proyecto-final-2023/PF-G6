const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "planTrainee",
    {
      id_PlanTrainee: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "trainee",
      },
    },
    { timestamps: false }
  );
};
