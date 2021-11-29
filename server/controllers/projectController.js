const router = require('express').Router();

const projectService = require('../services/projectService');

const { isAuth } = require('../middlewares/authMiddleware');
const { isOwn } = require('../middlewares/projectMiddleware');

router.post ('/', async (req, res)  => {
    let {title, contractor, location, startDate, dueDate, imageUrl, description, lead} = req.body;

    try { 
        await projectService.create( title, contractor, location, startDate, dueDate, imageUrl, description, lead );
        res.json({ok: true});
    } catch (error) { 
        res.json(error);
    }

});

router.get('/:projectId/details', async (req, res) => {
    let project = await projectService.getOne(req.params.projectId);

    isOwn = req.user?._id == project.creator;

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
        await projectService.updateOne(projectId, {title, contractor, location, startDate, dueDate, imageUrl, description, lead});
        res.json({ok: true});
        
    }catch(error) {
        let project = await projectService.getOne(req.params.projectId);
        res.json(project);
    }

});

router.delete('/:projectId/delete', isAuth, isOwn, async(req, res) => {
    try{
        await projectService.deleteOne(req.params.projectId);
        res.json({ok: true});

    }catch(error) {
        res.json(error);
    }
});


module.exports = router;