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

router.get('/details/team/:projectId', async (req, res) => {

    try{
        let team = await projectService.getTeam(req.params.projectId);
        res.json(team);
    } catch(error) {
        res.json({message: error.message})
    }
});

router.get('/details/:projectId', async (req, res) => {
    let project = await projectService.getOne(req.params.projectId);
    res.json(project);
});

router.get('/edit/:projectId', async(req, res) => {

    let project = await projectService.getOne(req.params.projectId);

    res.json(project);
});

router.put('/edit/:projectId', async(req, res) => {
    try{
        let projectData = req.body
        let projectId = req.params.projectId;
        let project = await projectService.updateOne(projectId, projectData);
        res.status(200).json(project);
        
    }catch(error) {
        console.log({message: error.message});
    }

});

router.delete('/delete/:projectId', async(req, res) => {
    try{
        await projectService.deleteOne(req.params.projectId);
        res.json({ok: true});

    }catch(error) {
        res.json({message: error.message});
    }
});

router.patch('/join/:projectId', async(req, res) => {
    try{
        let body = req.body;
        let userId = body.userId;
        let projectId = req.params.projectId;
        let project = await projectService.join(projectId, userId);
        res.status(200).json(project);
        
    }catch(error) {
        console.log({message: error.message});
    }

});

router.patch('/leave/:projectId', async(req, res) => {
    try{
        let body = req.body;
        let userId = body.userId;
        let projectId = req.params.projectId;
        let project = await projectService.leave(projectId, userId);
        res.status(200).json(project);
        
    }catch(error) {
        console.log({message: error.message});
    }

});


module.exports = router;