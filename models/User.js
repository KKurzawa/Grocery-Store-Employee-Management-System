const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {

        id: {
            type: DataTypes.INTEGER,
            allownill: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {

        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'user',
    }
);

module.exports = User;