const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "login",
    {
      id_login: {
        type: DataTypes.UUID,
        allowNull: false,
        default: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};


