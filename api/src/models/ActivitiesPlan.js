const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ActivitiesPlan",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idActivity: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      series: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      repetitions: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
};
