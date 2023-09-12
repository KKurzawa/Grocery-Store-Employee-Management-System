const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Manager extends Model {}

Manager.init(
    {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'department',
                key: 'id',
            },
        },
    },
    {

        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'manager',
    }
);

module.exports = Manager;