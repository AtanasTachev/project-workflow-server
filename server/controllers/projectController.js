const router = require('express').Router();

const projectService = require('../services/projectService');

const { isAuth } = require('../middlewares/authMiddleware');
const { isOwn } = require('../middlewares/projectMiddleware');

router.get('/', async(req,res) => {
    let projects = await projectService.getAll();
    res.json(projects);
}) 

router.post ('/create', async (req, res)  => {
    let {title, contractor, location, startDate, dueDate, imageUrl, description, lead, creator} = req.body;

    try { 
        let project = await projectService.create(title, contractor, location, startDate, dueDate, imageUrl, description, lead, creator);
        res.status(200).json(project);
    } catch (error) { 
        res.status(404).json({message: error.message});
    }

});

router.get(':userId/myProjects', async (req, res) => {
    try{
        let myProjects = await projectService.getMyProjects(req.params.userId);
        res.json(myProjects);
        console.log(myProjects);
    } catch(error) {
        res.json({message: error.message});
    }
})

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
        let userId = body.userId;
        let projectId = req.params.projectId;
        let project = await projectService.join(projectId, userId);
        res.status(200).json(project);
        
    }catch(error) {
        console.log({message: error.message});
    }

});

router.patch('/:projectId/leave', async(req, res) => {
    try{
        let body = req.body
        let userId = body.userId;
        let projectId = req.params.projectId;
        let project = await projectService.leave(projectId, userId);
        res.status(200).json(project);
        
    }catch(error) {
        console.log({message: error.message});
    }

});


module.exports = router;