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
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true, // Agregar esta opción
      },
      plantrainerIdPlanTrainer: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      planTraineeIdPlanTrainee: {
        type: DataTypes.UUID,
        allowNull: true,
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
