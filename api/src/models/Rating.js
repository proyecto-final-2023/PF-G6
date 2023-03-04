const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Rating", {
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
