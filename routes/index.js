const router = require('express').Router();
const apiRoutes = ('./api');

//Import all the api routes
router.use('/api', apiRoutes);

module.exports = router;