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

// Function to get the dates of the previous Monday and Friday
function getMondayAndFriday() {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  const priorMonday = new Date(today);
  const priorFriday = new Date(today);

  if (currentDayOfWeek === 0 || currentDayOfWeek === 6) {
    priorMonday.setDate(today.getDate() - daysToSubtract - 3);
    priorFriday.setDate(today.getDate() - daysToSubtract - 1);
  } else {
    priorMonday.setDate(today.getDate() - daysToSubtract - 7);
    priorFriday.setDate(priorMonday.getDate() + 4);
  }

  const priorMondayFormatted = formatDate(priorMonday);
  const priorFridayFormatted = formatDate(priorFriday);

  return { start: priorMondayFormatted, end: priorFridayFormatted };
}

// Function to format a date as "yyyy-mm-dd"
function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// GET all timpunches for a user between last Monday and Friday
  router.get('/week', async (req, res) => {
    const employeeId = await Employee.findOne({
      where: {
        user_id: req.session.user_id
      }
    })
    const empId = employeeId.id;
    try {
      const userId = req.session.user_id;
      const { start, end } = getMondayAndFriday();
      const timePunches = await Timepunch.findAll({
        where: {
          employee_id: empId,
          date: {
            [Sequelize.Op.gte]: start,
            [Sequelize.Op.lte]: end, 
          },
        },
        order: [['date', 'ASC']], 
      });
  
      res.status(200).json(timePunches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// CREATE a timepunch
router.post('/in', async (req, res) => {
    const employeeId = await Employee.findOne({
      where: {
        user_id: req.session.user_id
      }
    })
    const empId = employeeId.id;
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toLocaleTimeString([], { hour12: false });
    const inData = {
        date: date,
        clock_in: time,
        employee_id: empId
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
    const employeeId = await Employee.findOne({
      where: {
        user_id: req.session.user_id
      }
    })
    const empId = employeeId.id;
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toLocaleTimeString([], { hour12: false });
    const outData = {
        clock_out: time
    }
    try {
        const timepunchData = await Timepunch.update(outData, {
            where: {
                employee_id: empId,
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