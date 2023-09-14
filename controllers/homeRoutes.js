const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/profile',  async (req, res) => {
    res.render('profile');
});

router.get('/questions', (req, res) => {
    res.render('questions');
});

router.get('/timecard', (req, res) => {
    res.render('questions');
});

module.exports = router;