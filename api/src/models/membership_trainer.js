const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activities",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      user_id:{
        type: DataTypes.UUID,
        defaulvalue: UUIDV4,
        allowNull: false
      },
      category:{
        type: DataTypes.STRING,
        allowNull: false
      },
      trainees:{
        type: DataTypes.STRING,
        allowNull: true
      },
      begin_date:{
        type: DataTypes.DATE,
        allowNull: false
      },
      expiration_date:{
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    { timestamps: false }
  );
};
