const router = require('express').Router();
const { Role, Department } = require('../../models');

// GET all Roles
router.get('/', async (req, res) => {
    try {
        const roleData = await Role.findAll();
        res.status(200).json(roleData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET one Role
router.get('/:id', async (req, res) => {
    try {
        const roleData = await Role.findByPk(req.params.id, {
            include: [{ model: Department }]
        });

        if (!roleData) {
            res.status(400).json({ message: 'No role with this id.'});
            return;
        }

        res.status(200).json(roleData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// CREATE a Role
router.post('/', async (req, res) => {
    try {
        const roleData = await Role.create(req.body);
        res.status(200).json(roleData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;