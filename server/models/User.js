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
        type: String
    }],
    projectsJoined: [{
        type: String
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


userSchema.method('getProjects', function() {

    return this.myProjects.map(x => x.title).join(', ');

});



const User = mongoose.model('User', userSchema);

module.exports = User;

