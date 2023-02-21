const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "voucher",
    {
      id_voucher: {
        type: DataTypes.UUID,
        allowNull: false,
        default: DataTypes.UUIDV4,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
