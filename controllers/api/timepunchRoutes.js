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
// router.get('/:id', async (req, res) => {
//     try {
//         const timepunchData = await Timepunch.findByPk(req.params.id, {
//             include: [{ model: Employee }]
//         });

//         if (!timepunchData) {
//             res.status(400).json({ message: 'No time punch with this id.'});
//             return;
//         }

//         res.status(200).json(timepunchData);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

function getMondayAndFriday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  const friday = new Date(today);

  // Calculate the number of days to Monday and Friday in the previous week
  const daysUntilMonday = dayOfWeek === 0 ? -6 : -dayOfWeek + 1;
  const daysUntilFriday = dayOfWeek === 0 ? -2 : 5 - dayOfWeek;

  // Set Monday and Friday accordingly for the previous week
  monday.setDate(today.getDate() + daysUntilMonday);
  friday.setDate(today.getDate() + daysUntilFriday);

  // Format the dates as "yyyy-mm-dd"
  const mondayFormatted = formatDate(monday);
  const fridayFormatted = formatDate(friday);

  return { start: mondayFormatted, end: fridayFormatted };
}

// Function to format a date as "yyyy-mm-dd"
function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

  router.get('/week', async (req, res) => {
    try {
      const userId = req.session.user_id;
      const { start, end } = getMondayAndFriday();
  
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
  
      res.status(200).json(timePunches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// CREATE a timepunch
router.post('/in', async (req, res) => {
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toLocaleTimeString([], { hour12: false });
    const inData = {
        date: date,
        clock_in: time,
        employee_id: req.session.user_id
    };
 
    try {
        const timepunchData = await Timepunch.create(inData);
        res.status(200).json(timepunchData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a timepunch
router.put('/out', async (req, res) => {
    const userId = req.session.user_id;
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toLocaleTimeString([], { hour12: false });
    const outData = {
        clock_out: time
    }
    try {
        const timepunchData = await Timepunch.update(outData, {
            where: {
                employee_id: userId,
                date: date
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