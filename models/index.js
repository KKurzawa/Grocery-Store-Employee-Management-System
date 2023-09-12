const Employee = require('./Employee');
const Manager = require('./Manager');
const Role = require('./Role');
const Timepunch = require('./Timepunch');
const Department = require('./Department')
const User = require('./User')

User.hasMany(Employee, {
    foreignKey: "user_id",
    onDelete: 'CASCADE',
  });

Employee.belongsTo(User, {
    foreignKey: 'user_id',
  });

Employee.hasMany(Timepunch, {
    foreignKey: "employee_id",
    onDelete: 'CASCADE',
  });

Timepunch.belongsTo(Employee, {
    foreignKey: 'employee_id',
  });

Role.hasMany(Employee, {
    foreignKey: "role_id",
    onDelete: 'CASCADE',
  });

Employee.belongsTo(Role, {
    foreignKey: 'role_id',
  });

Department.hasMany(Role, {
    foreignKey: "department_id",
    onDelete: 'CASCADE',
  });

Role.belongsTo(Department, {
    foreignKey: 'department_id',
  });

Manager.hasMany(Employee, {
    foreignKey: "manager_id",
    onDelete: 'CASCADE',
  });
  
Employee.belongsTo(Manager, {
    foreignKey: 'manager_id',
  });

Department.hasMany(Manager, {
    foreignKey: "department_id",
    onDelete: 'CASCADE',
  });
  
Manager.belongsTo(Department, {
    foreignKey: 'department_id',
  });

module.exports = {
    Employee,
    Manager,
    Role,
    Timepunch,
    Department,
    User,
  };
  