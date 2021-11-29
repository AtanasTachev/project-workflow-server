const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const projectController = require('./controllers/projectController');


router.use(homeController);
router.use(authController);
router.use('/projects',projectController);


module.exports = router;

