
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
        type: String,
        required: true,
    },  
    dueDate: {
        type: String,
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
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true        
    },

    team: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
});


projectSchema.static('findByCreator', function(creator) {
    return this.find({creator});
})
// projectSchema.method('duration', function() {

//     return this.dueDate - this.startDate;

// });

projectSchema.method('teamJoin', function() {

    return this.team;

});

projectSchema.method('teamJoin', function() {

    return this.team;

});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;