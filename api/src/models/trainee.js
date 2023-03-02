const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "trainee",
    {
      id_trainee: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.DECIMAL,
      },
      neck: {
        type: DataTypes.DECIMAL,
      },
      torso: {
        type: DataTypes.DECIMAL,
      },
      chest: {
        type: DataTypes.DECIMAL,
      },
      waist: {
        type: DataTypes.DECIMAL,
      },
      arm: {
        type: DataTypes.DECIMAL,
      },
      wrist: {
        type: DataTypes.DECIMAL,
      },
      hip: {
        type: DataTypes.DECIMAL,
      },
      butt: {
        type: DataTypes.DECIMAL,
      },
      thig: {
        type: DataTypes.DECIMAL,
      },
      calf: {
        type: DataTypes.DECIMAL,
      },
      allergies: {
        type: DataTypes.STRING,
      },
      surgeries: {
        type: DataTypes.STRING,
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
      },
      lesions: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
