const express = require('express')
const router = express.Router()
const homeController = require('../controller/homeController')
const path = require('path');
const multer = require('multer');
var appRoot = require('app-root-path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter })

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:userId', homeController.getDetailPage)
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.get('/edit-user/:userId', homeController.getEditPage)
    router.post('/update-user', homeController.postUpdateUser)
    router.get('/about', (req, res) => {
        res.send('AboutPage')
    })
    router.get('/upload', homeController.getUploadFilePage)
    router.post('/upload-profile-pic', upload.single('profile-pic'), homeController.handleUploadFile)
    return app.use('/', router)  //sử dụng default cho route, ví dụ nếu /âbc -> /abc/ là home, /abc/about là about
}

module.exports = initWebRoute;