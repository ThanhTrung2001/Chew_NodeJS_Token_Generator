const connection = require('../config/connectDB');

let getHomepage = (req, res) => {
    //logic
    let data = []
    connection.query(
        ' SELECT * FROM `users` ',
        function (err, results, fields) {
            console.log('check MYSQL')
            console.log(results);
            results.map((row) => {
                data.push({
                    id: row.id,
                    email: row.email,
                    address: row.address,
                    firstname: row.firstname,
                    lastname: row.lastname
                })
            });
            return res.render('index.ejs', { dataUser: JSON.stringify(data) })

            // let rows = results.map((row) => { return row.id })
            // console.log(fields);
        }
    );

}

module.exports = {
    getHomepage
}