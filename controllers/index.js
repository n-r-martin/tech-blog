const router = require('express').Router();

const apiRoutes = require('./api');
const publicRoutes = require('./publicRoutes');

router.use('/', publicRoutes);
router.use('/api', apiRoutes);

module.exports = router;
