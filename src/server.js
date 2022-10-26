const dotenv = require('dotenv');
const express = require('express')
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const app = express()
const port = 3000

configViewEngine(app)

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/about', (req, res) => {
    res.send('AboutPage')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})