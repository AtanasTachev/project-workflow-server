const router = require('express').Router();

const projectService = require('../services/projectService');

const { isAuth } = require('../middlewares/authMiddleware');
const { isOwn } = require('../middlewares/projectMiddleware');

router.get('/', async(req,res) => {
    let projects = await projectService.getAll();
    res.json(projects);
}) 

router.post ('/create', async (req, res)  => {
    let projectData = req.body;

    try { 
        let project = await projectService.create(projectData);
        res.status(200).json(project);
    } catch (error) { 
        res.status(404).json({message: error.message});
    }

});

router.get('/:projectId/details', async (req, res) => {
    let project = await projectService.getOne(req.params.projectId);
    res.json(project);
});

router.get('/:projectId/edit', async(req, res) => {

    let project = await projectService.getOne(req.params.projectId);

    res.json(project);
});

router.put('/:projectId/edit', async(req, res) => {
    try{
        let projectData = req.body
        let projectId = req.params.projectId;
        let project = await projectService.updateOne(projectId, projectData);
        res.status(200).json(project);
        
    }catch(error) {
        console.log({message: error.message});
    }

});

router.delete('/:projectId/delete', async(req, res) => {
    try{
        await projectService.deleteOne(req.params.projectId);
        res.json({ok: true});

    }catch(error) {
        res.json({message: error.message});
    }
});

router.patch('/:projectId/join', async(req, res) => {
    try{
        let body = req.body
        let user = body.user;
        console.log(user);
        let projectId = req.params.projectId;
        let project = await projectService.join(projectId, user);
        res.status(200).json(project);
        
    }catch(error) {
        console.log({message: error.message});
    }

});


module.exports = router;