const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const projectController = require('./controllers/projectController');


router.use(homeController);
router.use(authController);
router.use('/project',projectController);
router.use('*', (req, res) => {
    res.status(404).render('404');
});

module.exports = router;

