const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "plantrainer",
    {
      id_planTrainer: {
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
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "trainer",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cantTrainees: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
