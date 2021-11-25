const router = require('express').Router();

const projectService = require('../services/projectService');

const { isAuth } = require('../middlewares/authMiddleware');
const { isOwn } = require('../middlewares/projectMiddleware');

router.get('/create-project', isAuth, (req, res) => {
    res.render('projectId/create');
});

router.post ('/create-project', isAuth, async (req, res)  => {
    let {title, keyword, location, dateCreated, imageUrl, description} = req.body;

    try { 
        await projectService.create( title, keyword, location, dateCreated, imageUrl, description, req.user._id, req.params.projectId );
        res.redirect('/');
    } catch (error) { 
        let projectId = await projectService.getOne(req.params.projectId);
        res.render(`project/create`, {...project, error: error.message});
    }

});

router.get('/:projectId/details', async (req, res) => {
    let projectId = await projectService.getOne(req.params.projectId);

    let isOwn = req.user?._id == projectId.author;

    let hasVoted = projectId.votes.some(x => x._id == req.user?._id);

    res.render('projectId/details', {...projectId, isOwn, hasVoted})
});

router.get('/:projectId/edit', isAuth, async(req, res) => {

    let projectId = await projectService.getOne(req.params.projectId);

    res.render('projectId/edit', {...projectId});
});

router.put('/:projectId/edit',isAuth, async(req, res) => {
    try{
        let {title, keyword, location, dateCreated, imageUrl, description, votes, rating} = req.body;

        let projectId = req.params.projectId;
        await projectService.updateOne(projectId, {title, keyword, location, dateCreated, imageUrl, description, votes, rating});
        res.redirect(`/projectId/${req.params.projectId}/details`);
        
    }catch(error) {
        let projectId = await projectService.getOne(req.params.projectId);
        res.render('projectId/edit', {...projectId, error: error.message});
    }

});

router.get('/:projectId/delete', isAuth, isOwn, async(req, res) => {
    try{
        await projectService.deleteOne(req.params.projectId);
        res.redirect('/');

    }catch(error) {
        res.render('projectId/details', {error: error.message});
    }
});


module.exports = router;