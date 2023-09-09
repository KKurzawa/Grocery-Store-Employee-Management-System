const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {}

Role.init(
    {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'departments',
                key: 'id',
            },
        },
    },
    {

        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'roles',
    }
);

module.exports = Role;