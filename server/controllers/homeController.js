const router = require('express').Router();
const projectService = require('../services/projectService')

router.get('/', async (req, res) => {
    let projects = await projectService.getAll();
    res.json(projects);
});

router.get('/all-projects', async (req, res) => {
    let projects = await projectService.getAll();
    res.json(projects);
}); 

module.exports = router;