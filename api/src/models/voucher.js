const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("membership",
    {
      id_voucher:{
        type:DataTypes.UUID,
        allowNull:false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};