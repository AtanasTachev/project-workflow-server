const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const routes = require('./routes');
const env = process.env.NODE_ENV || 'development';
const initDatabase = require('./config/database');
const config = require('./config/config')[env];
const { auth } = require('./middlewares/authMiddleware');
const dbConnection = process.env.dbConnection;


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(auth);
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

require ('dotenv/config');

app.use(routes);

initDatabase('mongodb://localhost:27017/ProjectWorkflow')
.then(() => {
    app.listen(3060, console.log.bind(console, 'App runnig at http://localhost:3060'));
    console.log('Connected to DB...');
})
.catch(error => {
    console.log(`App initialization failed: ${error}`);
});

