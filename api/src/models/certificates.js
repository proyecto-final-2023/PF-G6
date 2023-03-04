const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "certificates",
    {
      id_certificates: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
