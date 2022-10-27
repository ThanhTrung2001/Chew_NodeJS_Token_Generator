const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejsbasic'
});

connection.query(
    ' SELECT * FROM `users` ',
    function (err, results, fields) {
        console.log('check MYSQL')
        // console.log(results);
        // let rows = results.map((row) => { return row.id })
        // console.log(rows)
        // console.log(fields);
    }
);

module.exports = connection;