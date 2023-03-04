const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "AlimentsPlan",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idAliment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      portion: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      time: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
};
