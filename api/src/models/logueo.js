const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "logueo",
    {
      id_login: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // userId: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      //   // unique: true,
      // },
    },
    {
      timestamps: false,
      uniqueKeys: {
        UserLogueo_unique: {
          fields: ["userId", "id_login"],
        },
      },
    }
  );
};
