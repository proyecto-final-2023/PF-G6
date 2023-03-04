const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Comment", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
