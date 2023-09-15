const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Employee, Role } = require('../models');

router.get('/', (req, res) => {
    res.render('login', { loggedIn: false });
});


router.get('/profile', withAuth, async (req, res) => {
    const employee = await Employee.findOne({where:{user_id: req.session.user_id}, include: [Role]});
    const employeeData = employee.get({plain:true});
    res.render('profile', { loggedIn: true, ...employeeData });
});

router.get('/questions', withAuth, (req, res) => {
    res.render('questions', { loggedIn: req.session.logged_in, userId: req.session.user_id });

});

router.get('/timecard', withAuth, (req, res) => {
    res.render('timecard', { loggedIn: req.session.logged_in, userId: req.session.user_id });
});

router.get('/clock', withAuth, (req, res) => {
    res.render('clock', { loggedIn: req.session.logged_in, userId: req.session.user_id });
});

module.exports = router;