const User = require('../models/User');
const { jwtSign } = require('../utils/jwtSign');
const { SECRET } = require('../constants');

exports.register = function (firstName, lastName, email, password, repeatPassword ) {
    return User.create({firstName, lastName, email, password, repeatPassword,});
};

exports.login = function (email, password ) {
    return User.findByEmail(email)
    .then(user => Promise.all([user.validatePassword(password), user]))
    .then(([isValid, user]) => {
        if(isValid) {
            return user;
        } else {
            throw { message: 'Invalid email or password'}
        }
    })
    .catch(() => null);
}

exports.createToken = function(user) {
    let payload = {
        _id: user._id,
        email: user.email
    }
    
        return jwtSign(payload, SECRET);
};

exports.getUser = function(id) {
    return User.findById(id).populate('myProjects');
}