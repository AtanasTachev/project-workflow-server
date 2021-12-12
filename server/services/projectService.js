const Project = require('../models/Project');
const User = require('../models/User');

exports.getAll = function () {
    return Project.find({});
};

exports.create = async function (title, contractor, location, startDate, dueDate, imageUrl, description, lead, creator) {
    let project = new Project({
        title, contractor, location, startDate, dueDate, imageUrl, description, lead, creator
    });
    console.log(creator)
    let user = await User.findByIdAndUpdate(creator, {
        $push: { myProjects : title }
    });
    return [project.save(), user];
};

exports.getOne = function (id) {
    return Project.findById(id);
};

exports.updateOne = function (id, title, contractor, location, startDate, dueDate, imageUrl, description, lead) {
    return Project.findByIdAndUpdate(id, title, contractor, location, startDate, dueDate, imageUrl, description, lead
        , { runValidators: true });
};

exports.deleteOne = function (id) {
    return Project.findByIdAndDelete(id)
};

exports.join = async function (projectId, userId) {

    let user = await User.findByIdAndUpdate(userId, {
        $push: { projectsJoined: projectId }
    });
    let joinProject = await Project.findByIdAndUpdate(projectId, {
        $push: { team : userId }
    });
    return [joinProject, user];
};

exports.leave = async function (projectId, userId) {

    let user = await User.findByIdAndUpdate(userId, {
        $pull: { projectsJoined: projectId }
    });
    let joinProject = await Project.findByIdAndUpdate(projectId, {
        $pull: { team : userId }
    });
    return [joinProject, user];
};
