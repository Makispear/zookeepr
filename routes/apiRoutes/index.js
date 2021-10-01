const router = require('express').Router();
router.use(require('./zookeeperRoutes'));
const animalRoutes = require('../apiRoutes/animalRoutes');

router.use(animalRoutes);

module.exports = router;