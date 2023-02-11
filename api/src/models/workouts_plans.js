const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.UUID,
        defaulvalue: UUIDV4,
        primaryKey: true,
      },
      trainer_id:{
        type: DataTypes.UUID,
        defaulvalue: UUIDV4,
      },
      trainee_id:{
        type: DataTypes.UUID,
        defaulvalue: UUIDV4
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      description:{
        type: DataTypes.STRING,
        allowNull: false
      },
      video_url:{
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { timestamps: false }
  );
};