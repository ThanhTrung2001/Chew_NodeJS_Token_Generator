const mysql = require('mysql2/promise')

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'nodejsbasic'
// });

// connection.query(
//     ' SELECT * FROM `users` ',
//     function (err, results, fields) {
//         console.log('check MYSQL')
//         // console.log(results);
//         // let rows = results.map((row) => { return row.id })
//         // console.log(rows)
//         // console.log(fields);
//     }
// );

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejsbasic'
})

module.exports = pool;