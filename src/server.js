const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const initWebRoute = require('./route/web');
// const connection = require('./config/connectDB');
const app = express();
const port = 3000

//setup view Engine
configViewEngine(app)

//init web route
initWebRoute(app)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})