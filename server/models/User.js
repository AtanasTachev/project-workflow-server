const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT = 10;

const userSchema = new mongoose.Schema ({
    specialty: {
        type: String,
        enum: ['Arch', 'Struct', 'WSS', 'El', 'HVAC', 'FS', 'LS', 'GD'],
        required: true
    },
    title: {
        type: String,
        enum: ['arch.', 'eng.', 'l.arch.'],
        required: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        validate: /[A-Za-z]+/i
    },
    lastName: {
        type: String,
        required: true,
        minlength: 5,
        validate: /[A-Za-z]+/i
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        // validate: /[A-Za-z]+@[A-Za-z]+.[A-Za-z]+/i
    },
    password: {
        type: String,
        required: true,
        // minlength: 4,
    },
    myProjects: [{
        type: mongoose.Types.ObjectId,
        ref: 'Project'
    }],
    projectsJoined: [{
        type: mongoose.Types.ObjectId,
        ref: 'Project'
    }]
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT)
    .then(hash => {
        this.password = hash;
        next();
    });
});

userSchema.static('findByEmail', function(email) {
    return this.findOne({email});
});

userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password);
});

// userSchema.virtual('myProjectsList', {
//     ref: 'Project',
//     localField: '_id',
//     foreignField: 'creator'
//   });

// userSchema.method('getMyProjects', function() {

//     return this.myProjects;

// });

userSchema.method('getJoinedProjects', function() {

    return this.projectsJoined;

});



const User = mongoose.model('User', userSchema);

module.exports = User;

