const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "plan",
    {
      id_plan: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      datePlan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
