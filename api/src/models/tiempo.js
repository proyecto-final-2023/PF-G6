const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
      "tiempo",
      {
        id_time: {
          type: DataTypes.UUID,
          allowNull: false,
          default: DataTypes.UUIDV4,
          primaryKey: true,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        finishDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        days: {
          type: DataTypes.INTEGER,
        },
      },
      { timestamps: false }
    );
};