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
    allowNull: false,
    unique: true,
    validate: {
      is: /^[A-Za-z]+$/,
    },
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      not: /^[0-9]+$/,
    },
  },
  tail_length: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = Dog;
