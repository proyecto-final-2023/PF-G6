const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "socialNetworks",
    {
      id_sn: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
