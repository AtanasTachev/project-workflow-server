const mongoose = require('mongoose');

function initDatabase (connection) {
    return mongoose.connect(connection);
};

module.exports = initDatabase;