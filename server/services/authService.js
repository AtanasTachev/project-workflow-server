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

// exports.createToken = function(user) {
//     let payload = {
//         _id: user._id,
//         email: user.email
//     }
    
//         return jwtSign(payload, SECRET);
// };

// exports.getUser = function(id) {
//     return User.findById(id).populate('myProjects');
// }