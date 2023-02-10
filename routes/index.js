const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/', require('./homeRoutes'));

module.exports = router;