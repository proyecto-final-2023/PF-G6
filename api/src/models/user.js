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
      nickname: {
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
    },
    { timestamps: false }
  );
};
