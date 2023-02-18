const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        default: DataTypes.UUIDV4,
        primaryKey: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nick_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      rol: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        defaultValue: "male",
      },
      phone: {
        type: DataTypes.STRING,
      },
      cell: {
        type: DataTypes.STRING,
      },
      imgURL: {
        type: DataTypes.STRING(255),
      },
      verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
