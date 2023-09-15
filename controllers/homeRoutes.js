const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('login', { loggedIn: false });
});


router.get('/profile', async (req, res) => {
    res.render('profile', { loggedIn: true });
});

router.get('/questions', (req, res) => {
    res.render('questions', { loggedIn: true });

});

router.get('/timecard', withAuth, (req, res) => {
    res.render('timecard', { loggedIn: true });
});

router.get('/clock', withAuth(req, res) => {
    res.render('clock', { loggedIn: true });
});

module.exports = router;