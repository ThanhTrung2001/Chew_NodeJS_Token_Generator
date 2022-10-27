const express = require('express')
const router = express.Router()
const homeController = require('../controller/homeController')

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)

    router.get('/about', (req, res) => {
        res.send('AboutPage')
    })

    return app.use('/', router)  //sử dụng default cho route, ví dụ nếu /âbc -> /abc/ là home, /abc/about là about
}

module.exports = initWebRoute;