const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "membership",
    {
      id_membership: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      finishDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      uniqueKeys: {
        membershipTrainer_unique: {
          fields: ["userId", "plantrainerIdPlanTrainer"],
        },
        membershipTrainee_unique: {
          fields: ["userId", "planTraineeIdPlanTrainee"],
        },
      },
    }
  );
};
