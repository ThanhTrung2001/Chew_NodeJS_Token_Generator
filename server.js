const dotenv = require('dotenv');
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World! WTF')
})

app.get('/about', (req, res) => {
    res.send('AboutPage')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})