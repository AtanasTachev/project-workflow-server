const router = require('express').Router();
const projectService = require('../services/projectService')

router.get('/', async (req, res) => {
    let projects = await projectService.getAll();
    res.render('home', { projects });
});

router.get('/all-projects', async (req, res) => {
    let projects = await projectService.getAll();
    res.render('all-project', { projects });
}); 

module.exports = router;