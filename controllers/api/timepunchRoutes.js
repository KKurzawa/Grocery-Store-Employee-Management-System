const router = require('express').Router();
const { Timepunch, Employee } = require('../../models');
const { Sequelize, DataTypes } = require('sequelize');

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

function getLastMonday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    let diff;
    if (dayOfWeek === 0) {
      // If it's Sunday, calculate the previous Monday
      diff = 6;
    } else {
      diff = today.getDate() - dayOfWeek + (dayOfWeek === 1 ? -6 : 1);
    }
    const lastMonday = new Date(today.setDate(today.getDate() - diff));
  
    // Calculate the date of the following Friday
    const nextFriday = new Date(lastMonday);
    nextFriday.setDate(lastMonday.getDate() + 5); // Add 5 days to include Friday
  
    // Format the dates as "yyyy-mm-dd"
    const lastMondayFormatted = formatDate(lastMonday);
    const nextFridayFormatted = formatDate(nextFriday);
  
    return { start: lastMondayFormatted, end: nextFridayFormatted };
  }
  
  // Function to format a date as "yyyy-mm-dd"
  function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  router.get('/week/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const { start, end } = getLastMonday();
  
      // Query the Timepunch model to find time punches of the specified user from last Monday to the following Friday
      const timePunches = await Timepunch.findAll({
        where: {
          employee_id: userId,
          date: {
            [Sequelize.Op.gte]: start,
            [Sequelize.Op.lte]: end, // Use less than or equal to for the end date
          },
        },
        order: [['date', 'ASC']], // Adjust sorting as needed
      });
  
      res.json(timePunches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// CREATE a timepunch
router.post('/in', async (req, res) => {
 
    try {
        const timepunchData = await Timepunch.create(req.body);
        res.status(200).json(timepunchData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a timepunch
router.put('/out/:id', async (req, res) => {
    const userId = req.params.id;
    // const today = new Date().toISOString().slice(0, 10);
    const today = "2023-09-21";
    try {
        const timepunchData = await Timepunch.update(req.body, {
            where: {
                employee_id: userId,
                date: today
            }
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