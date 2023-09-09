const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TimePunch extends Model {}

TimePunch.init(
    {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        clock_in: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        clock_out: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employees',
                key: 'id',
            },
        },
    },
    {

        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'time_punches',
    }
);

module.exports = TimePunch;