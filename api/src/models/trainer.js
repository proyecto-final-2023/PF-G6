const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "trainer",
    {
      id_trainer: {
        type: DataTypes.UUID,
        allowNull: false,
        default: DataTypes.UUIDV4,
        primaryKey: true,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
