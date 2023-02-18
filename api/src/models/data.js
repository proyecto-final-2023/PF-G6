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
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      neck: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      torso: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      chess: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      waist: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      arm: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      wrist: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      hip: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      butt: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      thig: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      calf: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      allergies: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surgeries: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      smoke: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      drinker: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      drugs: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      roids: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      water: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lesions: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      smoke: {
        type: DataTypes.INTEGER,
        defaultValue: 8,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};