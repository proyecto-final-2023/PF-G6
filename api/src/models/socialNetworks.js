const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("socialNetworks", {
    id_sn: {
      type: DataTypes.UUID,
      allowNull: false,
      default: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
