const pool = require('../config/connectDB');

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    //checking
    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing',
        })
    }
    //hoac let firstName = req,body,firstName
    await pool.execute(`insert into users(firstName, lastName, email, address) values (?,?,?,?)`, [firstName, lastName, email, address])
    return res.status(200).json({
        message: 'ok',
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing',
        })
    }

    await pool.execute(`update users set firstname = ?, lastname = ? ,email = ?, address = ? where id = ?`, [firstName, lastName, email, address, id])
    return res.status(200).json({
        message: 'ok',
    })
}
let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: 'missing',
        })
    }
    await pool.execute(`Delete from users where id = ?`, [userId])
    return res.status(200).json({
        message: 'ok',
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}