const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        unique: true,
      },
      role: {
        type: DataTypes.STRING, //ERROR CON ENUM
      },
      gender: {
        type: DataTypes.STRING, //ERROR CON ENUM
        defaultValue: "male",
      },
      phone: {
        type: DataTypes.STRING,
      },
      imgURL: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );
};
