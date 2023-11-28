require('dotenv').config();
const mysql = require("mysql2");

const MYSQL_IP = process.env.MYSQL_IP;
const MYSQL_LOGIN = process.env.MYSQL_LOGIN;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.DATABASE;

let con = mysql.createConnection({
  host: MYSQL_IP,
  user: MYSQL_LOGIN,
  password: MYSQL_PASSWORD,
  database: DATABASE
});

module.exports = con;