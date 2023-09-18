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
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  const friday = new Date(today);

  
  const daysUntilMonday = dayOfWeek === 0 ? -6 : -dayOfWeek + 1;
  const daysUntilFriday = dayOfWeek === 0 ? -2 : 5 - dayOfWeek;

  
  monday.setDate(today.getDate() + daysUntilMonday);
  friday.setDate(today.getDate() + daysUntilFriday);

  
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
// GET all timpunches for a user between last Monday and Friday
  router.get('/week', async (req, res) => {
    try {
      const employeeId = await Employee.findOne({
        where: {
          user_id: req.session.user_id
        }
      })
      const empId = employeeId.id;
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