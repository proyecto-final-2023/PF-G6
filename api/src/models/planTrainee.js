const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define("planTrainee", {
      id_PlanTrainee: {
        type: DataTypes.UUID,
        allowNull: false,
        default: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
};