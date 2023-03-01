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
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
