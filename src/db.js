require("dotenv").config();

//utilizamos createPool para mejorar el performance de la API
//Podemos tener multiples queries 
//Se exporta la const connection para poder hacer las peticiones en los controllers

const mysql = require("mysql");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const connection = mysql.createPool({
  connectionLimit: 15,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

module.exports = connection;
