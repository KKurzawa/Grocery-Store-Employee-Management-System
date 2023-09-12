const router = require('express').Router();
const { Manager, Department } = require('../../models');

// GET all managers
router.get('/', async (req, res) => {
    try {
        const managerData = await Manager.findAll();
        res.status(200).json(managerData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET one manager
router.get('/:id', async (req, res) => {
    try {
        const managerData = await Manager.findByPk(req.params.id, {
            include: [{ model: Department }]
        });

        if (!managerData) {
            res.status(400).json({ message: 'No manager with that id.'});
            return;
        }

        res.status(200).json(managerData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// CREATE a Manager
router.post('/', async (req, res) => {
    try {
        const managerData = await Manager.create(req.body);
        res.status(200).json(managerData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;