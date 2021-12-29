const mysql = require("mysql");


const mysqlConnection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "P7",
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected on port 3306");
});




module.exports = mysqlConnection;