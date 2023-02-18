const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "login",
    {
      id_login: {
        type: DataTypes.UUID,
        allowNull:false,
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


