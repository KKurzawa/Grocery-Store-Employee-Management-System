const router = require('express').Router();
const { Department } = require('../../models');

// GET all Departments
router.get('/', async (req, res) => {
    try {
        const departmentData = await Department.findAll();
        res.status(200).json(departmentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET one department
router.get('/:id', async (req, res) => {
    try {
        const departmentData = await Department.findByPk(req.params.id);

        if (!departmentData) {
            res.status(400).json({ message: 'No department with that id.'});
            return;
        }

        res.status(200).json(departmentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// CREATE a department
router.post('/', async (req, res) => {
    try {
        const departmentData = await Department.create(req.body);
        res.status(200).json(departmentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;