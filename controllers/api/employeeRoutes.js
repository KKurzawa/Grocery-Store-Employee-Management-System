const router = require('express').Router();
const { Employee, User, Role, Manager } = require('../../models');

// GET all Employees
router.get('/', async (req, res) => {
    try {
        const employeeData = await Employee.findAll();
        res.status(200).json(employeeData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET one employee
router.get('/:id', async (req, res) => {
    try {
        const employeeData = await Employee.findByPk(req.params.id, {
            include: [{ model: User }, { model: Role }, { model: Manager }]
        });

        if (!employeeData) {
            res.status(400).json({ message: 'No employee with that id.'});
            return;
        }

        res.status(200).json(employeeData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// CREATE an employee
router.post('/', async (req, res) => {
    try {
        const employeeData = await Employee.create(req.body);
        res.status(200).json(employeeData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;