const seedUsers = require('./userData')
const seedEmployees = require('./employeeData.json');
const seedRoles = require('./roleData.json');
const seedManagers = require('./managerData.json');
const seedDepartments = require('./departmentData.json');
const seedTimepunch = require('./timepunchData.json');

const bcrypt = require('bcrypt')
const sequelize = require('../config/connection');
const { User, Employee, Role, Manager, Department, Timepunch } = require('../models');



const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const hashedUsers = await Promise.all(seedUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
            username: user.username,
            password: hashedPassword,
        };
    }));

    await User.bulkCreate(hashedUsers);

    await Department.bulkCreate(seedDepartments, {
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
