const pool = require('../config/connectDB');

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
module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser
}