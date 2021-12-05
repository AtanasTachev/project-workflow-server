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
// console.log(req.body);
    try { 
        let project = await projectService.create(projectData);
        res.status(200).json(project);
    } catch (error) { 
        res.status(404).json({message: error.message});
    }

});

router.get('/:projectId/details', async (req, res) => {
    let project = await projectService.getOne(req.params.projectId);

    // isOwn = req.user?._id == project.creator;

    res.json(project);
});

router.get('/:projectId/edit', isAuth, async(req, res) => {

    let project = await projectService.getOne(req.params.projectId);

    res.json(project);
});

router.put('/:projectId/edit',isAuth, async(req, res) => {
    try{
        let {title, contractor, location, startDate, dueDate, imageUrl, description, lead} = req.body;

        let projectId = req.params.projectId;
        let project = await projectService.updateOne(projectId, {title, contractor, location, startDate, dueDate, imageUrl, description, lead});
        res.status(200).json(project);
        
    }catch(error) {
        let project = await projectService.getOne(req.params.projectId);
        res.status(200).json(project);
    }

});

router.delete('/:projectId/delete', isAuth, isOwn, async(req, res) => {
    try{
        await projectService.deleteOne(req.params.projectId);
        res.json({ok: true});

    }catch(error) {
        res.json({message: error.message});
    }
});


module.exports = router;