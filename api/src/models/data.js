const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "data",
    {
      id_data: {
        type: DataTypes.UUID,
        allowNull: false,
        default: DataTypes.UUIDV4,
        primaryKey: true,
      },
      
    },
    { timestamps: false }
  );
};
