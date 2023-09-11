const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// can I delete this portion? line 8-10
router.get('./', async (req, res) => {

});

module.exports = router;