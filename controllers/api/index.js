const router = require('express').Router();
const userRoutes = require('./userRoutes');
const employeeRoutes = require('./employeeRoutes');
const managerRoutes = require('./managerRoutes');
const roleRoutes = require('./roleRoutes');
const departmentRoutes = require('./departmentRoutes');
const timepunchRoutes = require('./timepunchRoutes');

router.use('/users', userRoutes);
router.use('/employees', employeeRoutes);
router.use('/managers', managerRoutes);
router.use('/roles', roleRoutes);
router.use('/departments', departmentRoutes);
router.use('/timepunches', timepunchRoutes);

module.exports = router;