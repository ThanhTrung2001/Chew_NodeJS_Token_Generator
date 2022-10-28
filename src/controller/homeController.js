const pool = require('../config/connectDB');
const multer = require('multer');

let getHomepage = async (req, res) => {
    //logic
    let data = []
    // connection.query(
    //     ' SELECT * FROM `users` ',
    //     function (err, results, fields) {
    //         console.log('check MYSQL')
    //         console.log(results);
    //         results.map((row) => {
    //             data.push({
    //                 id: row.id,
    //                 email: row.email,
    //                 address: row.address,
    //                 firstname: row.firstname,
    //                 lastname: row.lastname
    //             })
    //         });
    //         return res.render('index.ejs', { dataUser: data, test: 'abc' }) // truyen theo kieu key: value

    // let rows = results.map((row) => { return row.id })
    // console.log(fields);
    // }
    // );
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('index.ejs', { dataUser: rows, test: 'abc' }) // truyen theo kieu key: value
    console.log(rows)

}

let getDetailPage = async (req, res) => {
    let userId = req.params.userId; //=> req.params.ten bien da dat o ben route
    const [user, fields] = await pool.execute('SELECT * FROM `users` WHERE `id` = ?', [userId]) //=> gan id = ? voi id
    console.log('check req params: ', user)
    return res.send(JSON.stringify(user))
    // console.log(user)
    // console.log('check req params: ', req.params) // => truyen tham so trong path voi :id/:user -> req.params se lay cac bien do ra

}

let createNewUser = async (req, res) => {
    console.log('check req: ', req.body) // body se an cac name tu input cuar html
    let { firstName, lastName, email, address } = req.body;
    //hoac let firstName = req,body,firstName
    await pool.execute(`insert into users(firstName, lastName, email, address) values (?,?,?,?)`, [firstName, lastName, email, address])
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let userId = req.body.userIdD;
    await pool.execute(`Delete from users where id = ?`, [userId])
    return res.redirect('/')
}

let getEditPage = async (req, res) => {
    let userId = req.params.userId;
    let [user] = await await pool.execute(`SELECT * FROM users WHERE id = ?`, [userId])
    return res.render('update.ejs', { dataUser: user[0] })
}

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body
    await pool.execute(`update users set firstname = ?, lastname = ? ,email = ?, address = ? where id = ?`, [firstName, lastName, email, address, id])
    return res.redirect('/')
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let getUploadFilePage = (req, res) => {
    return res.render("uploadFile.ejs")
}

//helper


const upload = multer().single('profile-pic');

let handleUploadFile = (req, res) => {


    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.path}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}



module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser, getUploadFilePage, handleUploadFile
}