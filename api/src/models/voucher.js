const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "voucher",
    {
      id_voucher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
