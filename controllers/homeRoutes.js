const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/profile', withAuth, (req, res) => {
    res.render('profile');
});

router.get('/questions', withAuth, (req, res) => {
    res.render('questions');
});

router.get('/timecard', withAuth, (req, res) => {
    res.render('timecard');
});

module.exports = router;