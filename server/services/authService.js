const User = require('../models/User');
const { jwtSign } = require('../utils/jwtSign');
const { SECRET } = require('../constants');

exports.register = function ({...userData}) {
    return User.create({...userData});
};

exports.login = async function ( email, password ) {

    let user = await User.findByEmail(email);
    let isValid = user.validatePassword(password);

        if(isValid) {
            let accessToken = await jwtSign({ _id: user._id, email: user.email}, SECRET )
            await user.save();
            return { user, accessToken };
        } else {
            throw { message: 'Invalid email or password'}
        }
    };

exports.getUser = function(id) {
    let user = User.findById(id);    
  
    return user;
}

exports.userJoinTeam = async function(userId, projectId) {
    let userToProject = await User.findByIdAndUpdate(userId, {
        $push: { $push: { projectsJoined: userId } 
        }
    });
    let joinProject = await Project.findByIdAndUpdate(projectId, {
        $push: { $push: { team: userId } 
    }
    });

    return {joinProject, userToProject};
}

exports.deleteUser = function(id) {
    let user = User.findByIdAndDelete(id);
    return user;
}

exports.getAllUsers = function() {
    let users = User.find({});
    return users
}

