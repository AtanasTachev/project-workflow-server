const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

function initDatabase (connection) {
    return mongoose.connect(connection);
};

module.exports = initDatabase;