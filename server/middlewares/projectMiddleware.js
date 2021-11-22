const projectService = require('../services/projectService');

exports.isOwn = (req, res, next) => {
    let project = projectService.getOne(req.params.projectId);

    if(project.author == req.user._id) {
        req.project = project;
        next();
    } else {
        next('You are not authorized to edit or delete this project!')
    }
}