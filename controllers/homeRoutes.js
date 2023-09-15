const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Employee, User, Role, Manager } = require('../models');

router.get('/', (req, res) => {
    res.render('login', { loggedIn: false });
});


router.get('/profile', async (req, res) => {
    const employee = await Employee.findOne({where:{user_id: req.session.user_id}, include: [Role]});
    const employeeData = employee.get({plain:true});
    res.render('profile', { loggedIn: true, ...employeeData });
});

router.get('/questions', (req, res) => {
    res.render('questions', { loggedIn: true });

});

router.get('/timecard', (req, res) => {
    res.render('timecard', { loggedIn: true });
});

router.get('/clock', (req, res) => {
    res.render('clock', { loggedIn: true });
});

module.exports = router;