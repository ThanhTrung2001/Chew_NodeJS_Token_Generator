const express = require('express')
const APIcontroller = require('../controller/APIController')
const router = express.Router()

const initWebRoute = (app) => {
    router.get('/', APIcontroller.getAllUsers) //method GET => read Data
    router.post('/create-user', APIcontroller.createNewUser)
    router.put('/update-user', APIcontroller.updateUser)
    router.delete('/delete-user/:id', APIcontroller.deleteUser)
    return app.use('/api/v1/', router)  //sử dụng default cho route, ví dụ nếu /âbc -> /abc/ là home, /abc/about là about
}

module.exports = initAPIRoute;
