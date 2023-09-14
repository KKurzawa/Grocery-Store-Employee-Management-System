const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('login', { loggedIn: false });
});

router.get('/profile', async (req, res) => {
    res.render('profile', { loggedIn: true });
});

router.get('/questions', (req, res) => {
    res.render('questions', { loggedIn: true });
});

router.get('/timecard', (req, res) => {
    res.render('questions');
});

module.exports = router;