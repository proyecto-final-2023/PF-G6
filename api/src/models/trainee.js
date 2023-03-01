const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("trainee", {
    id_trainee: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  });
};
