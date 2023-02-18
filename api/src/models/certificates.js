const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "certificates",
    {
      id_certificates:{
        type: DataTypes.UUID,
        allowNull:false,
      },
      type: {
        type: DataTypes.ENUM ('title', 'certificate'),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },      
    },
    { timestamps: false }
  );
};