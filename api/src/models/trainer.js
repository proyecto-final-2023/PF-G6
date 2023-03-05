const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "trainer",
    {
      id_trainer: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      logo: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );
};
