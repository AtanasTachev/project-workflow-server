
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema ({

    title: {
        type: String,
        required: true,
        minlength: [6, 'The title should be at least 6 characters long']
    },
    contractor: {
        type: String,
        required: true,
        minlength: [6, 'The contractor should be at least 6 characters long']
    },
    location: {
        type: String,
        required: true,
    }, 
    startDate: {
        type: Date,
        required: true,
    },  
    dueDate: {
        type: Date,
        required: true,
    },   
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https:?\/\//i, 'The home image should start with http or https!']
    },
    description: {
        type: String,
        required: true,
        minlength: [8, 'The description should be at least 8 characters long']
    },
    lead: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    team: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
});

projectSchema.method('duration', function() {

    return this.dueDate - this.startDate;

});

projectSchema.method('teamJoin', function() {

    return this.team.map(x => `${x.specialty}:${x.title} ${x.firstname} ${x.lastName}`).join(', ');

});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;