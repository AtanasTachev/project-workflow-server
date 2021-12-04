const { populate } = require('../models/Project');
const Project = require('../models/Project');
const User = require('../models/User');

exports.getAll = function () {
    return Project.find({});
};

exports.create = async function ({...projectData}) {
    let project = new Project({
            ...projectData
    });
    // console.log(project);
    // let user = await User.findByIdAndUpdate (userId, {
    //     $push: {myProjects: projectId}
    // })
    return project.save();
};

exports.getOne = function (id) {
    return Project.findById(id);
};

exports.updateOne = function (id, 
    { projectData }) {
    return Project.findByIdAndUpdate(id, 
        { ...projectData
        }, { runValidators: true });
};

exports.deleteOne = function (id) {
    return Project.findByIdAndDelete(id)
};

exports.join = async function (projectId, userId) {

    let user = await User.findByIdAndUpdate(userId, {
        $push: { projectsJoined: projectId }
    });
    let joinProject = await Project.findByIdAndUpdate(projectId, {
        $push: { $push: { team: userId } }
    });
    return [project, user];
};
