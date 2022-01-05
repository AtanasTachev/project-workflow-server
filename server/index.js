const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const routes = require('./routes');
const env = process.env.NODE_ENV || 'build';
const initDatabase = require('./config/database');
const config = require('./config/config')[env];
const { auth } = require('./middlewares/authMiddleware');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(auth);
app.use(cors());

require ('dotenv/config');

app.use(routes);

initDatabase(config.dbConnection)
.then(() => {
    app.listen(config.port, console.log.bind(console, `App runnig at http://localhost:${config.port}`));
    console.log('Connected to DB...');
})
.catch(error => {
    console.log(`App initialization failed: ${error}`);
});

