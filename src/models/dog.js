const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Dog = sequelize.define("dog", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  color: {
    type: DataTypes.STRING,
  },
  tail_length: {
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      min: 0,
    },
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      min: 0,
    },
  },
});

module.exports = Dog;
