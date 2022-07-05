const mysql = require('mysql')
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = proces.env
const connection = mysql.createPool({
    connectionLimit:15,
    host: DB_HOST,
    user: DB_USER,
    DB_PASSWORD,
    database: DB_NAME
})

module.exports = connection