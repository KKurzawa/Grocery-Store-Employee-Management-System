const router = require('express').Router();
const { Timepunch, Employee } = require('../../models');

// GET all timepunches
router.get('/', async (req, res) => {
    try {
        const timepunchData = await Timepunch.findAll();
        res.status(200).json(timepunchData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get one timepunch
router.get('/:id', async (req, res) => {
    try {
        const timepunchData = await Timepunch.findByPk(req.params.id, {
            include: [{ model: Employee }]
        });

        if (!timepunchData) {
            res.status(400).json({ message: 'No time punch with this id.'});
            return;
        }

        res.status(200).json(timepunchData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// CREATE a timepunch
router.post('/', async (req, res) => {
    try {
        const timepunchData = await Timepunch.create(req.body);
        res.status(200).json(timepunchData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a timepunch
router.put('/:id', async (req, res) => {
    try {
        const timepunchData = await Timepunch.update(req.body, {
            where: {id: req.params.id}
        });
        if (!timepunchData) {
            res.status(400).json({ message: 'No time punch with that id!' });
            return;
        }
        res.status(200).json(timepunchData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;