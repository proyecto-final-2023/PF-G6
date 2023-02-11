const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          image: {
            type: DataTypes.STRING,
            allowNull: false
          },
          weight: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          height: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          neck: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          torso: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          chest: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          waist: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          arm: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          wrist: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          hip: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          butt: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          thigh: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          calf: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          allergies: {
            type: DataTypes.STRING,
            allowNull: true
          },
          surgeries: {
            type: DataTypes.STRING,
            allowNull: true
          },
          smoke: {
            type: DataTypes.BOOLEAN,
            allowNull: false
          },
          drinker: {
            type: DataTypes.BOOLEAN,
            allowNull: false
          },
          drugs: {
            type: DataTypes.BOOLEAN,
            allowNull: false
          },
          roids: {
            type: DataTypes.BOOLEAN,
            allowNull: false
          },
          water: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          lesions: {
            type: DataTypes.STRING,
            allowNull: true
          },
          sleep_hours: {
            type: DataTypes.FLOAT,
            allowNull: false
          }
    },
    { timestamps: false }
  );
};