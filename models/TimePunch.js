const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Timepunch extends Model {}

Timepunch.init(
    {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        clock_in: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        clock_out: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employee',
                key: 'id',
            },
        },
    },
    {

        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'timepunch',
    }
);

module.exports = Timepunch;