const { DataTypes } = require("sequelize");

module.exports = (sequelize)=>{
    sequelize.define("plan", {
      id_plan: {
        type: DataTypes.UUID,
        allowNull: false,
        default: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
}