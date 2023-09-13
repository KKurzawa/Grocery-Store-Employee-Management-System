const seedUsers = require('./userData.json');
const seedEmployees = require('./employeeData.json');
const seedRoles = require('./roleData.json');
const seedManagers = require('./managerData.json');
const seedDepartments = require('./departmentData.json');
const seedTimepunch = require('./timepunchData.json');

const sequelize = require('../config/connection');
const { User, Employee, Role, Manager, Department, Timepunch } = require('../models');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Department.bulkCreate(seedDepartments, {
        individualHooks: true,
        returning: true,
    });

    await User.bulkCreate(seedUsers, {
        individualHooks: true,
        returning: true,
    });

    await Role.bulkCreate(seedRoles, {
        individualHooks: true,
        returning: true,
    });

    await Manager.bulkCreate(seedManagers, {
        individualHooks: true,
        returning: true,
    });

    await Employee.bulkCreate(seedEmployees, {
        individualHooks: true,
        returning: true,
    }); 

    await Timepunch.bulkCreate(seedTimepunch, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();
