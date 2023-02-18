const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "PlanTrainer",
    {
      id_planTrainer: {
        type: DataTypes.UUID,
        allowNull: false,
        default: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cantTrainer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};